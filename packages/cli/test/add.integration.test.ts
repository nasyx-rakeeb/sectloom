import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const registryDir = path.resolve(packageDir, '../registry/public');
const cliPath = path.join(packageDir, 'dist/index.js');

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = sortKeys((value as Record<string, unknown>)[key]);
        return result;
      }, {});
  }
  return value;
}

function runCli(
  args: string[]
): Promise<{ code: number | null; output: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd: packageDir,
      env: { ...process.env, NO_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', (chunk) => (output += chunk));
    child.stderr.on('data', (chunk) => (output += chunk));
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, output }));
  });
}

test('add honors aliases, overwrites by default, and keeps dry-run read-only', async (t) => {
  const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-add-'));
  t.after(() => fs.rm(projectDir, { recursive: true, force: true }));

  const server = http.createServer(async (request, response) => {
    try {
      const file = path.basename(
        new URL(request.url ?? '/', 'http://local').pathname
      );
      if (!/^[a-z0-9-]+\.json$/.test(file)) throw new Error('not found');
      response.setHeader('Content-Type', 'application/json');
      response.end(await fs.readFile(path.join(registryDir, file)));
    } catch {
      response.statusCode = 404;
      response.end('Not Found');
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise<void>((resolve) => server.close(() => resolve())));
  const address = server.address();
  assert.ok(address && typeof address === 'object');

  await Promise.all([
    fs.mkdir(path.join(projectDir, 'src/ui/sectloom'), { recursive: true }),
    fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify({ dependencies: {} })
    ),
    fs.writeFile(
      path.join(projectDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: { paths: { '@/*': ['./src/*'] } },
      })
    ),
  ]);

  const configPath = path.join(projectDir, 'sectloom.json');
  await fs.writeFile(
    configPath,
    JSON.stringify({
      style: 'default',
      tailwind: { css: 'src/app/globals.css', baseColor: 'slate' },
      aliases: { components: '@/ui', utils: '@/lib/utils' },
      registry: `http://127.0.0.1:${address.port}`,
      components: {},
    })
  );

  const target = path.join(projectDir, 'src/ui/sectloom/hero-efficiency.tsx');
  await fs.writeFile(target, 'existing content');

  const added = await runCli(['add', 'hero-efficiency', '--cwd', projectDir]);
  assert.equal(added.code, 0, added.output);
  assert.match(
    await fs.readFile(target, 'utf8'),
    /export function HeroEfficiency/
  );

  await fs.writeFile(target, 'local customization');
  const configBefore = await fs.readFile(configPath, 'utf8');
  const dryRun = await runCli([
    'add',
    'hero-efficiency',
    '--cwd',
    projectDir,
    '--dry-run',
  ]);
  assert.equal(dryRun.code, 0, dryRun.output);
  assert.equal(await fs.readFile(target, 'utf8'), 'local customization');
  assert.equal(await fs.readFile(configPath, 'utf8'), configBefore);
});

test('add validates every multi-file target before writing the first file', async (t) => {
  const projectDir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'sectloom-add-multifile-')
  );
  t.after(() => fs.rm(projectDir, { recursive: true, force: true }));

  const safeContent = 'export const SafeSection = () => null;\n';
  const unsafeContent = 'export const EscapedFile = true;\n';
  const unsignedItem = {
    name: 'multi-section',
    type: 'registry:section',
    category: 'test',
    title: 'Multi-file section',
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: 'components/sectloom/multi-section.tsx',
        content: safeContent,
        type: 'registry:section',
        checksum: hashContent(safeContent),
      },
      {
        path: 'components/../../escaped.ts',
        content: unsafeContent,
        type: 'registry:section',
        checksum: hashContent(unsafeContent),
      },
    ],
    designProfiles: [],
    previewAssets: [],
    version: '0.1.0',
  };
  const item = {
    ...unsignedItem,
    checksum: hashContent(JSON.stringify(sortKeys(unsignedItem))),
  };

  const server = http.createServer((_request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(item));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise<void>((resolve) => server.close(() => resolve())));
  const address = server.address();
  assert.ok(address && typeof address === 'object');

  await Promise.all([
    fs.mkdir(path.join(projectDir, 'src'), { recursive: true }),
    fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify({ dependencies: {} })
    ),
    fs.writeFile(
      path.join(projectDir, 'tsconfig.json'),
      JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } })
    ),
    fs.writeFile(
      path.join(projectDir, 'sectloom.json'),
      JSON.stringify({
        aliases: { components: '@/components', utils: '@/lib/utils' },
        registry: `http://127.0.0.1:${address.port}`,
        components: {},
      })
    ),
  ]);

  const result = await runCli([
    'add',
    'multi-section',
    '--yes',
    '--cwd',
    projectDir,
  ]);
  assert.equal(result.code, 1, result.output);
  assert.match(result.output, /Unsafe component target/);
  await assert.rejects(
    fs.stat(path.join(projectDir, 'src/components/sectloom/multi-section.tsx'))
  );
  await assert.rejects(fs.stat(path.join(projectDir, 'escaped.ts')));
});

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';
import type { TestContext } from 'node:test';
import { fileURLToPath } from 'node:url';

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const cliPath = path.join(packageDir, 'dist/index.js');

function runInit(projectDir: string): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [cliPath, 'init', '--yes', '--cwd', projectDir],
      { stdio: 'ignore' }
    );
    child.on('error', reject);
    child.on('close', resolve);
  });
}

async function createProject(
  t: TestContext,
  next = '^16.2.12',
  withGlobalCss = false
) {
  const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-init-'));
  t.after(() => fs.rm(projectDir, { recursive: true, force: true }));
  await fs.mkdir(path.join(projectDir, 'src/app'), { recursive: true });
  const writes = [
    fs.writeFile(
      path.join(projectDir, 'package.json'),
      JSON.stringify({
        dependencies: { next },
        devDependencies: { tailwindcss: '^4' },
      })
    ),
    fs.writeFile(
      path.join(projectDir, 'tsconfig.json'),
      JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } })
    ),
  ];
  if (withGlobalCss) {
    writes.push(
      fs.writeFile(
        path.join(projectDir, 'src/app/globals.css'),
        '@import "tailwindcss";\n/* user styles */\n'
      )
    );
  }
  await Promise.all(writes);
  return projectDir;
}

test('init succeeds without creating or modifying global CSS', async (t) => {
  const projectDir = await createProject(t);
  assert.equal(await runInit(projectDir), 0);
  assert.equal(await runInit(projectDir), 0);

  await assert.rejects(fs.stat(path.join(projectDir, 'src/app/globals.css')));
  const config = JSON.parse(
    await fs.readFile(path.join(projectDir, 'sectloom.json'), 'utf8')
  ) as Record<string, unknown>;
  assert.equal('style' in config, false);
  assert.equal('tailwind' in config, false);
  assert.deepEqual(config.aliases, {
    components: '@/components',
    utils: '@/lib/utils',
  });
});

test('init accepts legacy config and removes obsolete theme fields', async (t) => {
  const projectDir = await createProject(t, '^16.2.12', true);
  const cssPath = path.join(projectDir, 'src/app/globals.css');
  const before = await fs.readFile(cssPath, 'utf8');
  await fs.writeFile(
    path.join(projectDir, 'sectloom.json'),
    JSON.stringify({
      style: 'default',
      tailwind: { css: 'src/app/globals.css', baseColor: 'slate' },
      aliases: { components: '@/components', utils: '@/lib/utils' },
      registry: 'https://example.test/registry',
      components: {
        existing: { version: '0.1.0', checksum: 'abc123' },
      },
    })
  );

  assert.equal(await runInit(projectDir), 0);
  assert.equal(await fs.readFile(cssPath, 'utf8'), before);
  const config = JSON.parse(
    await fs.readFile(path.join(projectDir, 'sectloom.json'), 'utf8')
  ) as Record<string, unknown>;
  assert.equal('style' in config, false);
  assert.equal('tailwind' in config, false);
  assert.equal(config.registry, 'https://example.test/registry');
  assert.deepEqual(config.components, {
    existing: { version: '0.1.0', checksum: 'abc123' },
  });
});

test('init rejects unsupported Next.js before mutating the project', async (t) => {
  const projectDir = await createProject(t, '^13.5.0', true);
  const cssPath = path.join(projectDir, 'src/app/globals.css');
  const before = await fs.readFile(cssPath, 'utf8');

  assert.equal(await runInit(projectDir), 1);
  assert.equal(await fs.readFile(cssPath, 'utf8'), before);
  await assert.rejects(fs.stat(path.join(projectDir, 'sectloom.json')));
});

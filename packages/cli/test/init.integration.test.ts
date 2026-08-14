import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import test from 'node:test';
import type { TestContext } from 'node:test';
import { fileURLToPath } from 'node:url';
import { SECTLOOM_TOKENS_MARKER } from '../src/utils/tokens.js';

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

async function createProject(t: TestContext, next = '^16.2.12') {
  const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-init-'));
  t.after(() => fs.rm(projectDir, { recursive: true, force: true }));
  await fs.mkdir(path.join(projectDir, 'src/app'), { recursive: true });
  await Promise.all([
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
    fs.writeFile(
      path.join(projectDir, 'src/app/globals.css'),
      '@import "tailwindcss";\n'
    ),
  ]);
  return projectDir;
}

test('init injects canonical tokens idempotently with portable config paths', async (t) => {
  const projectDir = await createProject(t);
  assert.equal(await runInit(projectDir), 0);
  assert.equal(await runInit(projectDir), 0);

  const css = await fs.readFile(
    path.join(projectDir, 'src/app/globals.css'),
    'utf8'
  );
  assert.equal(css.split(SECTLOOM_TOKENS_MARKER).length - 1, 1);
  const config = JSON.parse(
    await fs.readFile(path.join(projectDir, 'sectloom.json'), 'utf8')
  ) as { tailwind: { css: string } };
  assert.equal(config.tailwind.css, 'src/app/globals.css');
});

test('init rejects unsupported Next.js before mutating the project', async (t) => {
  const projectDir = await createProject(t, '^13.5.0');
  const cssPath = path.join(projectDir, 'src/app/globals.css');
  const before = await fs.readFile(cssPath, 'utf8');

  assert.equal(await runInit(projectDir), 1);
  assert.equal(await fs.readFile(cssPath, 'utf8'), before);
  await assert.rejects(fs.stat(path.join(projectDir, 'sectloom.json')));
});

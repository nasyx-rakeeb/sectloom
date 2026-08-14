import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildRegistry } from '../src/build.js';
import { registryComponents } from '../src/metadata.js';

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const componentsDir = path.resolve(packageDir, '../components/src');

async function snapshot(directory: string): Promise<Record<string, string>> {
  const files = (await fs.readdir(directory))
    .filter((file) => file.endsWith('.json'))
    .sort();
  const entries = await Promise.all(
    files.map(async (file) => [
      file,
      crypto
        .createHash('sha256')
        .update(await fs.readFile(path.join(directory, file)))
        .digest('hex'),
    ])
  );
  return Object.fromEntries(entries);
}

test('registry builds repeatably and removes stale JSON', async (t) => {
  const publicDir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'sectloom-registry-')
  );
  t.after(() => fs.rm(publicDir, { recursive: true, force: true }));

  await buildRegistry({ componentsDir, publicDir });
  const first = await snapshot(publicDir);
  await fs.writeFile(path.join(publicDir, 'stale.json'), '{}\n');
  await buildRegistry({ componentsDir, publicDir });
  const second = await snapshot(publicDir);

  assert.deepEqual(second, first);
  await assert.rejects(fs.stat(path.join(publicDir, 'stale.json')));
  for (const file of Object.keys(second)) {
    const content = await fs.readFile(path.join(publicDir, file), 'utf8');
    assert.equal(content.endsWith('\n'), true);
    assert.doesNotMatch(content, /requiredTokens|"tailwind"\s*:\s*\{/);
  }
});

test('registry rejects source paths outside the components directory', async (t) => {
  const publicDir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'sectloom-registry-path-')
  );
  t.after(() => fs.rm(publicDir, { recursive: true, force: true }));

  const unsafe = {
    ...registryComponents[0],
    files: [
      {
        path: '../components-escape/example.tsx',
        target: 'components/sectloom/example.tsx',
      },
    ],
  };

  await assert.rejects(
    buildRegistry({ componentsDir, publicDir, components: [unsafe] }),
    /Unsafe file path/
  );
});

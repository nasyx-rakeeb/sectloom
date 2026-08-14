import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { syncRegistry } from './sync-registry.mjs';

test('syncRegistry copies exact JSON and removes stale JSON only', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-sync-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const sourceDir = path.join(root, 'source');
  const targetDir = path.join(root, 'target');
  await Promise.all([
    fs.mkdir(sourceDir, { recursive: true }),
    fs.mkdir(targetDir, { recursive: true }),
  ]);
  await Promise.all([
    fs.writeFile(path.join(sourceDir, 'index.json'), '{"ok":true}\n'),
    fs.writeFile(path.join(sourceDir, 'hero.json'), '{"name":"hero"}\n'),
    fs.writeFile(path.join(targetDir, 'stale.json'), '{}\n'),
    fs.writeFile(path.join(targetDir, 'keep.txt'), 'untouched'),
  ]);

  const files = await syncRegistry({ sourceDir, targetDir });

  assert.deepEqual(files, ['hero.json', 'index.json']);
  assert.equal(
    await fs.readFile(path.join(targetDir, 'hero.json'), 'utf8'),
    '{"name":"hero"}\n'
  );
  await assert.rejects(fs.stat(path.join(targetDir, 'stale.json')));
  assert.equal(await fs.readFile(path.join(targetDir, 'keep.txt'), 'utf8'), 'untouched');
});

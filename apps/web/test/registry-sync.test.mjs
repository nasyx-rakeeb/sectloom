import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

test('web registry matches the canonical generated registry', async () => {
  const canonicalDir = path.resolve('../../packages/registry/public');
  const webDir = path.resolve('public/registry');
  const files = (await fs.readdir(canonicalDir))
    .filter((file) => file.endsWith('.json'))
    .sort();

  assert.deepEqual(
    (await fs.readdir(webDir)).filter((file) => file.endsWith('.json')).sort(),
    files
  );
  for (const file of files) {
    const [canonical, web] = await Promise.all([
      fs.readFile(path.join(canonicalDir, file)),
      fs.readFile(path.join(webDir, file)),
    ]);
    assert.deepEqual(web, canonical, `${file} differs`);
  }
});

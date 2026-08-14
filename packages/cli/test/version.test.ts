import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { getCliVersion } from '../src/utils/version.js';

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);

test('CLI version is read from package.json', async () => {
  const manifest = JSON.parse(
    await fs.readFile(path.join(packageDir, 'package.json'), 'utf8')
  ) as { version: string };
  assert.equal(getCliVersion(), manifest.version);
});

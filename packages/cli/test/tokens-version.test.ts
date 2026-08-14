import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  appendTokenStylesheet,
  loadTokenStylesheet,
  SECTLOOM_TOKENS_MARKER,
} from '../src/utils/tokens.js';
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

test('CLI packages the canonical token stylesheet byte-for-byte', async () => {
  const [canonical, packaged, loaded] = await Promise.all([
    fs.readFile(path.resolve(packageDir, '../tokens/tokens.css'), 'utf8'),
    fs.readFile(path.join(packageDir, 'dist/tokens.css'), 'utf8'),
    loadTokenStylesheet(),
  ]);
  assert.equal(packaged, canonical);
  assert.equal(loaded, canonical);
  assert.match(
    canonical,
    new RegExp(SECTLOOM_TOKENS_MARKER.replace(/[/*]/g, '\\$&'))
  );
});

test('token injection preserves CSS and is idempotent', async () => {
  const tokens = await loadTokenStylesheet();
  const original = '@import "tailwindcss";\n';
  const once = appendTokenStylesheet(original, tokens);
  const twice = appendTokenStylesheet(once, tokens);

  assert.equal(twice, once);
  assert.equal(once.startsWith(original), true);
  assert.equal(once.split(SECTLOOM_TOKENS_MARKER).length - 1, 1);
  assert.equal(
    appendTokenStylesheet('--color-primary: var(--primary);', tokens).includes(
      SECTLOOM_TOKENS_MARKER
    ),
    true
  );
});

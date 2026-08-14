import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { RegistryItemSchema, type RegistryItem } from '@sectloom/contracts';
import {
  validateComponentName,
  verifyRegistryItem,
} from '../src/utils/registry.js';

const packageDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const registryItemPath = path.resolve(
  packageDir,
  '../registry/public/hero-efficiency.json'
);

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

function metadataChecksum(item: RegistryItem): string {
  const clone = { ...item };
  delete clone.checksum;
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(sortKeys(clone)))
    .digest('hex');
}

async function readItem(): Promise<RegistryItem> {
  return RegistryItemSchema.parse(
    JSON.parse(await fs.readFile(registryItemPath, 'utf8'))
  );
}

test('registry verification accepts canonical artifacts', async () => {
  assert.equal(verifyRegistryItem(await readItem()).name, 'hero-efficiency');
});

test('registry verification rejects metadata and file corruption', async () => {
  const item = await readItem();
  assert.throws(
    () => verifyRegistryItem({ ...item, title: 'Tampered' }),
    /metadata.*Tampering detected/
  );

  const corruptedFileItem: RegistryItem = {
    ...item,
    files: item.files.map((file, index) =>
      index === 0 ? { ...file, content: `${file.content}\ncorrupted` } : file
    ),
  };
  corruptedFileItem.checksum = metadataChecksum(corruptedFileItem);
  assert.throws(
    () => verifyRegistryItem(corruptedFileItem),
    /Checksum mismatch for file/
  );
});

test('registry component names reject URL and traversal payloads', () => {
  assert.doesNotThrow(() => validateComponentName('hero-efficiency'));
  assert.throws(
    () => validateComponentName('../index'),
    /Invalid component name/
  );
  assert.throws(
    () => validateComponentName('hero?name=x'),
    /Invalid component name/
  );
});

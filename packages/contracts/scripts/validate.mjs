import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RegistryItemSchema } from '../dist/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const validPath = path.join(ROOT_DIR, 'test/fixtures/valid-component.json');
const invalidPath = path.join(ROOT_DIR, 'test/fixtures/invalid-component.json');

const validData = JSON.parse(fs.readFileSync(validPath, 'utf-8'));
const invalidData = JSON.parse(fs.readFileSync(invalidPath, 'utf-8'));

let success = true;

const validResult = RegistryItemSchema.safeParse(validData);
if (!validResult.success) {
  console.error('❌ Expected valid-component.json to pass, but it failed:');
  console.error(validResult.error);
  success = false;
} else {
  console.log('✅ valid-component.json passed as expected.');
}

const invalidResult = RegistryItemSchema.safeParse(invalidData);
if (invalidResult.success) {
  console.error('❌ Expected invalid-component.json to fail, but it passed.');
  success = false;
} else {
  console.log('✅ invalid-component.json failed as expected.');
}

if (!success) {
  process.exit(1);
}

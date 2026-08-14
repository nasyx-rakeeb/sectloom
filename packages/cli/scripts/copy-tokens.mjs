import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cliDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const source = path.resolve(cliDir, '../tokens/tokens.css');
const destination = path.join(cliDir, 'dist/tokens.css');

await fs.mkdir(path.dirname(destination), { recursive: true });
await fs.copyFile(source, destination);

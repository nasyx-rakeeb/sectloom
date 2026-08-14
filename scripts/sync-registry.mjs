import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(SCRIPT_DIR, '..');

async function listJsonFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => entry.name)
    .sort();
}

async function copyAtomically(sourcePath, targetPath) {
  const temporaryPath = `${targetPath}.${process.pid}.tmp`;
  await fs.copyFile(sourcePath, temporaryPath);
  await fs.rename(temporaryPath, targetPath);
}

export async function syncRegistry({
  sourceDir = path.join(WORKSPACE_ROOT, 'packages/registry/public'),
  targetDir = path.join(WORKSPACE_ROOT, 'apps/web/public/registry'),
} = {}) {
  await fs.mkdir(targetDir, { recursive: true });

  const sourceFiles = await listJsonFiles(sourceDir);
  const targetFiles = await listJsonFiles(targetDir);
  const expectedFiles = new Set(sourceFiles);

  await Promise.all(
    targetFiles
      .filter((file) => !expectedFiles.has(file))
      .map((file) => fs.unlink(path.join(targetDir, file)))
  );

  await Promise.all(
    sourceFiles.map((file) =>
      copyAtomically(path.join(sourceDir, file), path.join(targetDir, file))
    )
  );

  for (const file of sourceFiles) {
    const [source, target] = await Promise.all([
      fs.readFile(path.join(sourceDir, file)),
      fs.readFile(path.join(targetDir, file)),
    ]);
    if (!source.equals(target)) {
      throw new Error(`Registry synchronization failed for ${file}`);
    }
  }

  return sourceFiles;
}

const isMainModule =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  syncRegistry()
    .then((files) => {
      console.log(`Synchronized ${files.length} registry files.`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

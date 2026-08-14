import path from 'node:path';

export function isPathInside(rootDir: string, candidatePath: string): boolean {
  const root = path.resolve(rootDir);
  const candidate = path.resolve(candidatePath);
  const relative = path.relative(root, candidate);
  return (
    relative === '' ||
    (!path.isAbsolute(relative) &&
      relative !== '..' &&
      !relative.startsWith(`..${path.sep}`))
  );
}

export function resolveInside(
  rootDir: string,
  candidatePath: string,
  label = 'path'
): string {
  const resolved = path.resolve(rootDir, candidatePath);
  if (!isPathInside(rootDir, resolved)) {
    throw new Error(`Unsafe ${label}: ${candidatePath}`);
  }
  return resolved;
}

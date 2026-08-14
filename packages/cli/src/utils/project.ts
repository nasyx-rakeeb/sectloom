import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse as parseJsonc } from 'jsonc-parser';
import { minVersion } from 'semver';
import { resolveInside } from './path.js';

export interface ProjectInfo {
  isNextJs: boolean;
  isAppRouter: boolean;
  isTypeScript: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
  globalCssPath: string | null;
  nextVersion: string | null;
  nextMajor: number | null;
  tailwindVersion: string | null;
  tailwindMajor: number | null;
  hasTailwindConfig: boolean;
  componentsAlias: string | null;
  utilsAlias: string | null;
}

interface ParsedTsConfig {
  baseUrl: string;
  paths: Record<string, string[]>;
}

const DEPENDENCY_SPECIFIER =
  /^(?:@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*|[a-z0-9][a-z0-9._-]*)(?:@[a-zA-Z0-9.*^~<>=|+_-]+)?$/;

function normalizeVersionSpec(spec: string): string | null {
  let normalized = spec.trim();

  if (normalized.startsWith('workspace:')) {
    normalized = normalized.slice('workspace:'.length);
  }

  if (normalized.startsWith('npm:')) {
    const aliasMatch = normalized.match(/^npm:(?:@[^/]+\/[^@]+|[^@]+)@(.+)$/);
    if (!aliasMatch) return null;
    normalized = aliasMatch[1];
  }

  return normalized === '' || normalized === '*' ? null : normalized;
}

export function getMinimumMajor(versionSpec: string | null): number | null {
  if (!versionSpec) return null;
  const normalized = normalizeVersionSpec(versionSpec);
  if (!normalized) return null;

  try {
    const minimum = minVersion(normalized, { loose: true });
    return minimum?.major ?? null;
  } catch {
    return null;
  }
}

async function readTsConfig(cwd: string): Promise<ParsedTsConfig> {
  try {
    const raw = await fs.readFile(path.join(cwd, 'tsconfig.json'), 'utf8');
    const parsed = parseJsonc(raw) as {
      compilerOptions?: {
        baseUrl?: string;
        paths?: Record<string, string[]>;
      };
    };
    return {
      baseUrl: parsed.compilerOptions?.baseUrl ?? '.',
      paths: parsed.compilerOptions?.paths ?? {},
    };
  } catch {
    return { baseUrl: '.', paths: {} };
  }
}

function resolveAliasFromPaths(
  alias: string,
  paths: Record<string, string[]>
): string | null {
  for (const [pattern, targets] of Object.entries(paths)) {
    const target = targets[0];
    if (!target) continue;

    const wildcardIndex = pattern.indexOf('*');
    if (wildcardIndex === -1) {
      if (pattern === alias) return target;
      continue;
    }

    const prefix = pattern.slice(0, wildcardIndex);
    const suffix = pattern.slice(wildcardIndex + 1);
    if (!alias.startsWith(prefix) || !alias.endsWith(suffix)) continue;

    const wildcardValue = alias.slice(
      prefix.length,
      alias.length - suffix.length
    );
    return target.replace('*', wildcardValue);
  }

  return null;
}

export async function resolveComponentsDirectory(
  cwd: string,
  alias: string
): Promise<string> {
  const tsconfig = await readTsConfig(cwd);
  const mappedPath = resolveAliasFromPaths(alias, tsconfig.paths);

  if (mappedPath) {
    return resolveInside(
      cwd,
      path.resolve(cwd, tsconfig.baseUrl, mappedPath.replace(/\/\*$/, '')),
      `components alias '${alias}'`
    );
  }

  if (alias === '@/components') {
    const hasSrc = await fs
      .stat(path.join(cwd, 'src'))
      .then((stat) => stat.isDirectory())
      .catch(() => false);
    return path.join(cwd, hasSrc ? 'src/components' : 'components');
  }

  throw new Error(
    `Unable to resolve components alias '${alias}' from tsconfig.json paths.`
  );
}

export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const pkgPath = path.join(cwd, 'package.json');
  let pkg: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  try {
    pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
  } catch {
    throw new Error(
      `Failed to read package.json in ${cwd}. Are you in a project root?`
    );
  }

  const nextVersion =
    pkg.dependencies?.next ?? pkg.devDependencies?.next ?? null;
  const tailwindVersion =
    pkg.dependencies?.tailwindcss ?? pkg.devDependencies?.tailwindcss ?? null;

  const [hasAppDir, hasSrcAppDir, isTypeScript] = await Promise.all([
    fs
      .stat(path.join(cwd, 'app'))
      .then((stat) => stat.isDirectory())
      .catch(() => false),
    fs
      .stat(path.join(cwd, 'src/app'))
      .then((stat) => stat.isDirectory())
      .catch(() => false),
    fs
      .stat(path.join(cwd, 'tsconfig.json'))
      .then((stat) => stat.isFile())
      .catch(() => false),
  ]);

  let packageManager: ProjectInfo['packageManager'] = 'npm';
  const lockfiles: [string, ProjectInfo['packageManager']][] = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
  ];
  for (const [lockfile, manager] of lockfiles) {
    const exists = await fs
      .stat(path.join(cwd, lockfile))
      .then(() => true)
      .catch(() => false);
    if (exists) {
      packageManager = manager;
      break;
    }
  }

  const hasTailwindConfig = await Promise.all(
    ['tailwind.config.ts', 'tailwind.config.js', 'tailwind.config.mjs'].map(
      (file) =>
        fs
          .stat(path.join(cwd, file))
          .then(() => true)
          .catch(() => false)
    )
  ).then((results) => results.some(Boolean));

  const cssCandidates = [
    'app/globals.css',
    'src/app/globals.css',
    'styles/globals.css',
    'src/styles/globals.css',
    'app/global.css',
    'src/app/global.css',
  ];
  let globalCssPath: string | null = null;
  for (const candidate of cssCandidates) {
    const exists = await fs
      .stat(path.join(cwd, candidate))
      .then((stat) => stat.isFile())
      .catch(() => false);
    if (exists) {
      globalCssPath = candidate;
      break;
    }
  }

  const tsconfig = await readTsConfig(cwd);
  const componentsAlias =
    Object.keys(tsconfig.paths)
      .find((alias) => alias.startsWith('@/components'))
      ?.replace(/\/\*$/, '') ?? null;
  const utilsAlias =
    Object.keys(tsconfig.paths)
      .find((alias) => alias.includes('/utils') || alias.includes('/lib/utils'))
      ?.replace(/\/\*$/, '') ?? null;

  return {
    isNextJs: nextVersion !== null,
    isAppRouter: hasAppDir || hasSrcAppDir,
    isTypeScript,
    packageManager,
    globalCssPath,
    nextVersion,
    nextMajor: getMinimumMajor(nextVersion),
    tailwindVersion,
    tailwindMajor: getMinimumMajor(tailwindVersion),
    hasTailwindConfig,
    componentsAlias,
    utilsAlias,
  };
}

export function getCompatibilityErrors(project: ProjectInfo): string[] {
  const errors: string[] = [];
  if (!project.isNextJs) errors.push('Next.js is not installed.');
  else if (project.nextMajor === null)
    errors.push(
      `Unable to determine Next.js version '${project.nextVersion}'.`
    );
  else if (project.nextMajor < 14)
    errors.push('Sectloom requires Next.js 14 or newer.');

  if (!project.isAppRouter) errors.push('Next.js App Router was not detected.');
  if (!project.isTypeScript) errors.push('TypeScript was not detected.');

  if (project.tailwindVersion === null)
    errors.push('Tailwind CSS is not installed.');
  else if (project.tailwindMajor === null)
    errors.push(
      `Unable to determine Tailwind CSS version '${project.tailwindVersion}'.`
    );
  else if (project.tailwindMajor !== 4)
    errors.push('Sectloom requires Tailwind CSS 4.');

  return errors;
}

export function assertValidDependencySpecifier(dependency: string): void {
  if (!DEPENDENCY_SPECIFIER.test(dependency)) {
    throw new Error(`Unsafe dependency specifier: ${dependency}`);
  }
}

export function createDependencyInstallCommand(
  packageManager: ProjectInfo['packageManager'],
  dependencies: string[]
): { command: string; args: string[] } {
  dependencies.forEach(assertValidDependencySpecifier);
  const action = packageManager === 'npm' ? 'install' : 'add';
  return { command: packageManager, args: [action, ...dependencies] };
}

export function installDependencies(
  cwd: string,
  packageManager: ProjectInfo['packageManager'],
  dependencies: string[]
): void {
  if (dependencies.length === 0) return;
  const { command, args } = createDependencyInstallCommand(
    packageManager,
    dependencies
  );
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args[0]} failed with exit code ${result.status ?? 'unknown'}.`
    );
  }
}

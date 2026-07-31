import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

export interface ProjectInfo {
  isNextJs: boolean;
  isAppRouter: boolean;
  isTypeScript: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
  globalCssPath: string | null;
  tailwindVersion: 3 | 4 | null;
  hasTailwindConfig: boolean;
  componentsAlias: string | null;
  utilsAlias: string | null;
  nextVersion: string | null;
}

export async function detectProject(cwd: string): Promise<ProjectInfo> {
  const pkgPath = path.join(cwd, 'package.json');
  let pkg: any = {};
  try {
    const pkgContent = await fs.readFile(pkgPath, 'utf-8');
    pkg = JSON.parse(pkgContent);
  } catch {
    throw new Error(
      `Failed to read package.json in ${cwd}. Are you in a project root?`
    );
  }

  const nextVersion =
    pkg.dependencies?.next || pkg.devDependencies?.next || null;
  const isNextJs = !!nextVersion;

  // Check for app router
  const hasAppDir = await fs
    .stat(path.join(cwd, 'app'))
    .then((s) => s.isDirectory())
    .catch(() => false);
  const hasSrcAppDir = await fs
    .stat(path.join(cwd, 'src', 'app'))
    .then((s) => s.isDirectory())
    .catch(() => false);
  const isAppRouter = hasAppDir || hasSrcAppDir;

  const isTypeScript = await fs
    .stat(path.join(cwd, 'tsconfig.json'))
    .then((s) => s.isFile())
    .catch(() => false);

  // Package manager
  let packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun' = 'npm';
  if (
    await fs
      .stat(path.join(cwd, 'pnpm-lock.yaml'))
      .then(() => true)
      .catch(() => false)
  )
    packageManager = 'pnpm';
  else if (
    await fs
      .stat(path.join(cwd, 'yarn.lock'))
      .then(() => true)
      .catch(() => false)
  )
    packageManager = 'yarn';
  else if (
    await fs
      .stat(path.join(cwd, 'bun.lockb'))
      .then(() => true)
      .catch(() => false)
  )
    packageManager = 'bun';

  // Tailwind Version
  const twVersionRaw =
    pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss;
  let tailwindVersion: 3 | 4 | null = null;
  if (twVersionRaw) {
    if (twVersionRaw.includes('4.')) tailwindVersion = 4;
    else if (twVersionRaw.includes('3.')) tailwindVersion = 3;
    else tailwindVersion = 3; // fallback guessing 3 for others
  }

  const hasTailwindConfig =
    (await fs
      .stat(path.join(cwd, 'tailwind.config.ts'))
      .then(() => true)
      .catch(() => false)) ||
    (await fs
      .stat(path.join(cwd, 'tailwind.config.js'))
      .then(() => true)
      .catch(() => false));

  // Global CSS candidates
  const cssCandidates = [
    'app/globals.css',
    'src/app/globals.css',
    'styles/globals.css',
    'src/styles/globals.css',
    'app/global.css',
    'src/app/global.css',
  ];
  let globalCssPath: string | null = null;
  for (const c of cssCandidates) {
    const full = path.join(cwd, c);
    if (
      await fs
        .stat(full)
        .then(() => true)
        .catch(() => false)
    ) {
      globalCssPath = full;
      break;
    }
  }

  // Check tsconfig for aliases
  let componentsAlias = null;
  let utilsAlias = null;
  try {
    const tsconfigRaw = await fs.readFile(
      path.join(cwd, 'tsconfig.json'),
      'utf-8'
    );
    // VERY primitive JSON parsing to bypass comments
    const cleaned = tsconfigRaw.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    const tsconfig = JSON.parse(cleaned);
    const paths = tsconfig.compilerOptions?.paths || {};
    if (paths['@/components/*']) componentsAlias = '@/components';
    if (paths['@/utils/*'] || paths['@/lib/utils/*'])
      utilsAlias = paths['@/utils/*'] ? '@/utils' : '@/lib/utils';
  } catch {
    // ignore
  }

  return {
    isNextJs,
    isAppRouter,
    isTypeScript,
    packageManager,
    globalCssPath,
    tailwindVersion,
    hasTailwindConfig,
    componentsAlias,
    utilsAlias,
    nextVersion,
  };
}

export function installDependencies(
  cwd: string,
  pm: 'npm' | 'yarn' | 'pnpm' | 'bun',
  deps: string[]
) {
  if (deps.length === 0) return;
  const cmd =
    pm === 'npm'
      ? 'npm install'
      : pm === 'yarn'
        ? 'yarn add'
        : pm === 'bun'
          ? 'bun add'
          : 'pnpm install';
  execSync(`${cmd} ${deps.join(' ')}`, { cwd, stdio: 'inherit' });
}

import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import type { TestContext } from 'node:test';
import {
  assertValidDependencySpecifier,
  createDependencyInstallCommand,
  detectProject,
  getCompatibilityErrors,
  getMinimumMajor,
  resolveComponentsDirectory,
} from '../src/utils/project.js';
import { resolveInside } from '../src/utils/path.js';

async function createProject(
  t: TestContext,
  nextVersion = '^16.2.12',
  tailwindVersion = '^4'
): Promise<string> {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-project-'));
  t.after(() => fs.rm(cwd, { recursive: true, force: true }));
  await Promise.all([
    fs.mkdir(path.join(cwd, 'src/app'), { recursive: true }),
    fs.writeFile(
      path.join(cwd, 'package.json'),
      JSON.stringify({
        dependencies: { next: nextVersion },
        devDependencies: { tailwindcss: tailwindVersion },
      })
    ),
    fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: { paths: { '@/*': ['./src/*'] } },
      })
    ),
  ]);
  await fs.writeFile(
    path.join(cwd, 'src/app/globals.css'),
    '@import "tailwindcss";\n'
  );
  return cwd;
}

test('semantic version ranges resolve to their minimum major', () => {
  assert.equal(getMinimumMajor('4'), 4);
  assert.equal(getMinimumMajor('^4'), 4);
  assert.equal(getMinimumMajor('~4.1.0'), 4);
  assert.equal(getMinimumMajor('15.0.0-rc.0'), 15);
  assert.equal(getMinimumMajor('workspace:^4'), 4);
  assert.equal(getMinimumMajor('npm:tailwindcss@^4.1.0'), 4);
  assert.equal(getMinimumMajor('latest'), null);
});

test('Next.js 16 and Tailwind 4 fixture-style ranges are compatible', async (t) => {
  const cwd = await createProject(t);
  const project = await detectProject(cwd);

  assert.equal(project.nextMajor, 16);
  assert.equal(project.tailwindMajor, 4);
  assert.equal(project.globalCssPath, 'src/app/globals.css');
  assert.deepEqual(getCompatibilityErrors(project), []);
});

test('unsupported framework and Tailwind versions fail compatibility', async (t) => {
  const cwd = await createProject(t, '^13.5.0', '^3.4.0');
  const errors = getCompatibilityErrors(await detectProject(cwd));

  assert.match(errors.join(' '), /Next\.js 14 or newer/);
  assert.match(errors.join(' '), /Tailwind CSS 4/);
});

test('custom component aliases resolve through wildcard tsconfig paths', async (t) => {
  const cwd = await createProject(t);
  await fs.writeFile(
    path.join(cwd, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        baseUrl: '.',
        paths: { '@acme/*': ['./src/design-system/*'] },
      },
    })
  );

  assert.equal(
    await resolveComponentsDirectory(cwd, '@acme/ui'),
    path.join(cwd, 'src/design-system/ui')
  );
});

test('path containment rejects traversal and shared-prefix siblings', async (t) => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'sectloom-root-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));

  assert.equal(
    resolveInside(root, 'components/item.tsx'),
    path.join(root, 'components/item.tsx')
  );
  assert.throws(() => resolveInside(root, '../escape.tsx'), /Unsafe path/);
  assert.throws(
    () => resolveInside(root, `${root}-escape/item.tsx`),
    /Unsafe path/
  );
});

test('dependency commands use argument arrays and reject shell payloads', () => {
  assert.deepEqual(createDependencyInstallCommand('pnpm', ['lucide-react']), {
    command: 'pnpm',
    args: ['add', 'lucide-react'],
  });
  assert.doesNotThrow(() =>
    assertValidDependencySpecifier('@scope/pkg@^1.2.0')
  );
  assert.throws(
    () => assertValidDependencySpecifier('lucide-react;touch-owned'),
    /Unsafe dependency specifier/
  );
  assert.throws(
    () => assertValidDependencySpecifier('pkg $(touch owned)'),
    /Unsafe dependency specifier/
  );
});

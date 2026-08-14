import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: rootDir });
const nextConfigs = compat.extends('next/core-web-vitals').map((config) => ({
  ...config,
  files: ['apps/web/**/*.{js,jsx,ts,tsx}'],
}));

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextConfigs,
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/node_modules/**',
      'fixtures/next-app/**',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
    },
  }
);

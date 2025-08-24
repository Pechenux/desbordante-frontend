/* eslint-disable import/no-anonymous-default-export */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
  ),
  {
    ignores: ['/src/api/generated/*'],
    plugins: {
      prettier,
      '@tanstack/query': pluginQuery,
      tseslint,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],

          pathGroups: [
            {
              pattern: './*.scss',
              group: 'sibling',
              position: 'after',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
];

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2026,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  prettier,
];

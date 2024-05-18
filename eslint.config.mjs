import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['.dist/',".node_modules/"],
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      // to enforce using type for object type definitions, can be type or interface
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      'no-unused-expressions': 'warn',
      'prefer-const': 'warn',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
];

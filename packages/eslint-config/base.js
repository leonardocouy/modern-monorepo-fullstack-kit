import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier, // Must be last to disable conflicting rules
  {
    rules: {
      // Console
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Best practices
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // Errors
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },
];

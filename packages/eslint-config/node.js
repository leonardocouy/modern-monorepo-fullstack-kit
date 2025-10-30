import nodePlugin from 'eslint-plugin-n';
import typescript from './typescript.js';

export default [
  ...typescript,
  {
    plugins: {
      n: nodePlugin,
    },
    rules: {
      // Node.js specific rules
      'n/no-missing-import': 'off', // Conflicts with TypeScript
      'n/no-unsupported-features/es-syntax': 'off', // We use modern ES features
      'n/no-process-exit': 'warn',
      'n/handle-callback-err': 'error',
      'n/no-sync': 'warn',

      // Express.js best practices
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },
];

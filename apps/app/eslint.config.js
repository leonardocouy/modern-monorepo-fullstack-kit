import react from '@starter/eslint-config/react';

export default [
  ...react,
  {
    ignores: ['dist/', 'node_modules/', '.tanstack/', 'routeTree.gen.ts'],
  },
];

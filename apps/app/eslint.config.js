import react from '@my-life-manager/eslint-config/react';

export default [
  ...react,
  {
    ignores: ['dist/', 'node_modules/', '.tanstack/', 'routeTree.gen.ts'],
  },
];

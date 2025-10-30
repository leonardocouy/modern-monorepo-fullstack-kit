import typescript from '@my-life-manager/eslint-config/typescript';

export default [
  ...typescript,
  {
    ignores: ['dist/', 'node_modules/', 'drizzle/'],
  },
];

import typescript from '@starter/eslint-config/typescript';

export default [
  ...typescript,
  {
    ignores: ['dist/', 'node_modules/'],
  },
];

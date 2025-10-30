import node from '@starter/eslint-config/node';

export default [
  ...node,
  {
    ignores: ['dist/', 'node_modules/'],
  },
];

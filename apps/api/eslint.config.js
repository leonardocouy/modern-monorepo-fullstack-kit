import node from '@my-life-manager/eslint-config/node';

export default [
  ...node,
  {
    ignores: ['dist/', 'node_modules/'],
  },
];

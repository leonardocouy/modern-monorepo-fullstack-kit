import baseConfig from '@starter/eslint-config/base';
import typescriptConfig from '@starter/eslint-config/typescript';
import nodeConfig from '@starter/eslint-config/node';

export default [...baseConfig, ...typescriptConfig, ...nodeConfig];

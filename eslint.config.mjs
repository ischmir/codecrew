import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        // '__dirname': 'readonly',
        // 'process': 'readonly',
        // 'require': 'readonly',
        // 'module': 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,

  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'eqeqeq': ['error', 'always'],
      'indent': ['error', 2],
      'no-eval': ['error'],
      'no-trailing-spaces': ['error'],
      'no-unused-vars': ['error'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
];
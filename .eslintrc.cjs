module.exports = {
    root: true,
    env: {
        browser: true,
        es2021:true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        //tsconfigRootDir: __dirname,
        //project: ['./tsconfig.json'],
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      //'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
  };
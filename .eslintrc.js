module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    '@vue/eslint-config-typescript',
    '@nuxtjs/eslint-config'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/no-unused-components': [
      'warn',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    '@typescript-eslint/comma-dangle': [
      'warn',
      {
        arrays: 'always',
        objects: 'always',
      },
    ],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'warn',
    quotes: ['warn', 'single'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'no-console': 'warn',
    'max-len': ['error', { code: 150 }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'array-bracket-spacing': 0,
    'space-before-function-paren': ['warn', {
      anonymous: "never",
      named: "always",
      asyncArrow: "always"
    }],
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/no-v-html': 'off',
    'restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  globals: {
    $fetch: true,
    $store: true,
    defineNuxtConfig: true,
    checkImage: true,
    defineNuxtComponent: true,
    preFetch: true,
    useFetch: true,
    useRoute: true,
    useHead: true,
    getDate: true,
    defineNuxtPlugin: true,
    useRuntimeConfig: true,
  }
};

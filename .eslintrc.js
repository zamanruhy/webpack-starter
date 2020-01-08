module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    'vue',
    'babel'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3
    }],
    'vue/html-self-closing': 'off',
    // allow optional chaining
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error'
  }
}

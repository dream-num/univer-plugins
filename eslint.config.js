import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  regexp: false,
  rules: {
    curly: ['error', 'multi-line'],
    'antfu/if-newline': 'off',
    'style/quote-props': ['error', 'as-needed'],
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'no-new': 'off',
  },
})

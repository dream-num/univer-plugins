import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['**/templates/**/*'],
}, {
  rules: {
    curly: ['error', 'multi-line'],
    'antfu/if-newline': 'off',
    'style/quote-props': ['error', 'as-needed'],
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
  },
})

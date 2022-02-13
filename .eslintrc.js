const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'].concat(isDev ? ['prettier'] : []),
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': ['webpack', 'node'],
  },
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    camelcase: [2, { allow: ['release_date', 'poster_path', 'vote_average', 'vote_count'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/require-default-props': 'off',
    'no-warning-comments': 'warn',
    curly: [2, 'all'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: null,
        filter: {
          regex: '^(release_date|poster_path|vote_average|vote_count)$',
          match: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['with*.js'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
};

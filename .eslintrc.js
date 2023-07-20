module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript', 
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-explicit-any': ['error'],
        curly: ['error'],
        'no-else-return': [
          'error',
          {
            allowElseIf: false,
          },
        ],
        'no-console': ['warn'],
        'react/destructuring-assignment': ['error', 'always'],
        'prefer-destructuring': [
          'error',
          {
            object: true,
            array: false,
          },
        ],
        'react/react-in-jsx-scope': ['off'],
        'react/display-name': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-use-before-define': ['off'],
        "@typescript-eslint/no-misused-promises": ['off'],
        "import/no-extraneous-dependencies": ['off'],
        "import/extensions": ["off"],
      }
    },
  ],
};
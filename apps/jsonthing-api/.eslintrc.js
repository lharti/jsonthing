module.exports = {
    root: true,

    extends: [
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',

        'plugin:prettier/recommended',
    ],

    overrides: [
        {
            files: ['*.test.ts', '*.spec.ts'],
            extends: ['plugin:jest/all', 'plugin:jest-extended/all'],
        },
    ],

    plugins: ['@typescript-eslint', 'jest', 'jest-extended'],

    rules: {
        'jest/prefer-importing-jest-globals': 'off',

        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],

        'require-await': [2],
    },

    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },

    env: {
        node: true,
        jest: true,
    },

    ignorePatterns: ['.eslintrc.js', 'dist'],
}

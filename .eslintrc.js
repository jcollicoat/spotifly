/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['/*.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jsx-a11y',
        'promise',
        'prettier',
    ],
    rules: {
        eqeqeq: ['error'],
        'import/named': 'warn',
        'import/no-default-export': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'jsx-a11y/no-noninteractive-tabindex': 'error',
        'no-implicit-coercion': ['error'],
        'no-nested-ternary': 'warn',
        'no-throw-literal': 'error',
        'no-use-before-define': 'error',
        'no-useless-catch': 'error',
        'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
        'promise/param-names': 'error',
        'promise/prefer-await-to-callbacks': 'error',
        'promise/prefer-await-to-then': 'error',
        'promise/no-return-wrap': 'error',
        quotes: ['error', 'single', { avoidEscape: true }],
        'react/display-name': 'error',
        'react/jsx-curly-brace-presence': [
            'error',
            { propElementValues: 'always' },
        ],
        'react/jsx-key': 'error',
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-array-index-key': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-danger': 'error',
        'react/no-unused-state': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/self-closing-comp': ['error', { component: true, html: false }],
        'react/prefer-stateless-function': 'error',
        'require-await': 'error',
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE', 'PascalCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'typeParameter',
                format: ['PascalCase'],
                prefix: ['T'],
            },
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
        ],
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unused-vars': ['error'],
    },
    settings: {
        'import/extensions': ['.ts', '.tsx'],
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
            },
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },
};

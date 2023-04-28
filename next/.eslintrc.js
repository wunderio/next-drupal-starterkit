module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:storybook/recommended",
    "next",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
      },
      env: {
        browser: true,
        node: true,
      },
      plugins: ["simple-import-sort"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@next/next/recommended",
        "prettier",
      ],
      rules: {
        "prettier/prettier": "error",

        // Relax some TypeScript rules to make them more accessible to beginners.
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-misused-promises": [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],

        // Sort imports.
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Side effect imports.
              ["^\\u0000"],
              // Packages. Put `next`/`react`-related packages first.
              ["^next", "^@next", "^react", "^@?\\w"],
              // Internal paths - change these to match your project structure defined in tsconfig.json.
              ["^@/(components|lib|pages|styles|types)(/.*|$)"],
              // Component library imports.
              ["^@wunder-component-library(/.*|$)"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ],
          },
        ],

        // Allow unused variables that start with an underscore.
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_|^err",
          },
        ],
      },
    },
  ],
};

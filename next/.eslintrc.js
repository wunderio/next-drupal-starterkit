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
  extends: ["eslint:recommended", "prettier"],
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
      plugins: ["@typescript-eslint", "simple-import-sort"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "next",
        "prettier",
      ],
      rules: {
        "prettier/prettier": "error",

        // Relax some TypeScript rules to make them more accessible to beginners.
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",

        // Sort imports.
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^\\u0000"], // Side effect imports.
              ["^next", "^react", "^@?\\w"], // Packages. Put `next`/`react`-related packages first.
              ["^@/(components|lib)(/.*|$)"], // Internal paths - change these to match your project structure defined in tsconfig.json.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // Parent imports. Put `..` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // Other relative imports. Put same-folder imports and `.` last.
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

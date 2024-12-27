module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
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
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      env: {
        browser: true,
        node: true,
      },
      plugins: ["n", "simple-import-sort"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "next",
        "prettier",
      ],
      rules: {
        "prettier/prettier": "error",

        // Relax some TypeScript rules to make them more accessible to beginners.
        // Remove these if you want to enforce stricter rules.
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],

        // Instead, `import { env } from "@/env"` to access environment variables.
        "n/no-process-env": ["error"],

        "no-restricted-imports": [
          "error",
          {
            paths: [
              // Restrict i18n imports to ensure SSR compatibility.
              {
                name: "react-i18next",
                message: 'Import from "next-i18next" instead.',
              },
            ],
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
              ["^@/(app|components|lib|pages|styles|types)(/.*|$)"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ],
          },
        ],
      },
    },
  ],
};

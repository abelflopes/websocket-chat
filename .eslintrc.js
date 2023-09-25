/** @type import("eslint").Linter.Config */
const config = {
  rules: {
    "jsx-quotes": ["error", "prefer-double"],
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "allow",
      },
    ],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-indent": ["error", 2],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/no-unresolved": 0, // prevent error on tsconfig paths
    "arrow-parens": ["error", "always"],
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
        multilineDetection: "brackets",
      },
    ],
    // TODO: review --------------------------------------------------------------------------------
    // Eslint
    "comma-dangle": 0,
    quotes: [1, "double"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "always", prev: "export", next: "*" },
      { blankLine: "always", prev: "*", next: "try" },
    ],
    "no-console": 1,
    "require-await": 1,
    "arrow-body-style": [2, "as-needed"],
    // Prettier
    "prettier/prettier": 1,
    // Typescript
    "@typescript-eslint/space-before-function-paren": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/quotes": [1, "double"],
    "@typescript-eslint/semi": [0],
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/consistent-type-assertions": [
      2,
      {
        assertionStyle: "never",
      },
    ],
    // Imports
    "import/no-unresolved": 0,
    "import/namespace": 0,
    "import/no-relative-parent-imports": 1,
    "import/order": 0,
    // Unicorn
    "unicorn/no-array-for-each": 0,
    "unicorn/filename-case": [
      1,
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
    "unicorn/prevent-abbreviations": [
      1,
      {
        allowList: {
          db: true,
          props: true,
          Props: true,
          Param: true,
        },
      },
    ],
  },
};

module.exports = config;

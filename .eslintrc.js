module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
    "prettier/standard",
    "plugin:import/typescript",
  ],
  plugins: ["react-hooks", "unicorn", "import"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/camelcase": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.spec.ts",
          "**/*.spec.js",
          "**/webpack.config.js",
          "**/*.stories.tsx",
        ],
      },
    ],
    "import/no-default-export": "error",
  },
  overrides: [
    {
      files: ["**/*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};

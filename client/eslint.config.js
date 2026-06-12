import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["src/**/*.{js,jsx}"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        document: "readonly",
        FormData: "readonly",
        URL: "readonly",
      },
    },
    plugins: {
      ...eslintReact.configs.recommended.plugins,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: eslintReact.configs.recommended.settings,
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
    },
  },
];

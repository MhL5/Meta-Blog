import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|val" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "req|res|next|val" },
      ],
    },
  },
];

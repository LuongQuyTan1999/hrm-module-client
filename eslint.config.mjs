import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginBoundaries from "eslint-plugin-boundaries";
import pluginImport from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...pluginQuery.configs["flat/recommended"],
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended"
  ),
  {
    plugins: {
      import: pluginImport,
      boundaries: pluginBoundaries,
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: [
                "page-component",
                "widgets",
                "features",
                "entities",
                "shared",
              ],
            },
            {
              from: "page-component",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
            },
            {
              from: "features",
              allow: ["entities", "shared"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "shared",
              allow: [], // ✅ shared không được import gì cả
            },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      boundaries: {
        elements: [
          { type: "app", pattern: "src/app/**" },
          { type: "page-component", pattern: "src/page-component/**" },
          { type: "widgets", pattern: "src/widgets/**" },
          { type: "features", pattern: "src/features/**" },
          { type: "entities", pattern: "src/entities/**" },
          { type: "shared", pattern: "src/shared/**" },
        ],
      },
    },
  },
];

export default eslintConfig;

// ./steiger.config.ts
import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "fsd/segments-by-purpose": "off",
      "fsd/public-api": "off",
    },
  },
]);

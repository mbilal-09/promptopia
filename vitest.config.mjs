import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.mjs"],
    include: ["components/**/*.{test,spec}.{js,jsx}"],
    exclude: ["node_modules", ".next"],
  },
  resolve: {
    alias: {
      "@": rootDir,
      "@components": path.join(rootDir, "components"),
      "@utils": path.join(rootDir, "utils"),
      "@models": path.join(rootDir, "models"),
    },
  },
});

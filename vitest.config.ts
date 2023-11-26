import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Provide global APIs for explicitness
    environment: "jsdom", // The environment that will be used for testing
    setupFiles: ["src/__tests__/setup.jsdom.ts"],
    coverage: {
      // Whether to include all files, including the untested ones into report.
      all: true,
      // Coverage Providers: "v8" or "istanbul" or your custom provider
      provider: "v8",
      // Coverage reporters to use
      reporter: ["text", "html"],
      // Coverage folder location
      reportsDirectory: "./tests/unit/coverage",
      // List of files included in coverage as glob patterns
      include: ["src/**"],
      // List of files excluded from coverage as glob patterns.
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/constants.ts",
        "src/types.ts",
        "src/mocks/*",
        "src/**/*.d.ts",
      ],
    },
    css: false,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});

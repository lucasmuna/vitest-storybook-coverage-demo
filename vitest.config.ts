import path from "node:path";
import { fileURLToPath } from "node:url";

import { coverageConfigDefaults, defineConfig } from "vitest/config"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "html", "json", "lcov"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/postcss.config.mjs",
        "**/next.config.ts",
        "**/storybook-static/**",
        "**/coverage/**",
        "**/coverage-outputs/**",
        "**/coverage-merged/**",
        "**/coverage-lcov-merged/**",
        "**/.nyc_output/**",
        "**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
      {
      extends: true,
        plugins: [tsconfigPaths(), react()],
        test: {
          name: "unit",
          include: ["**/test/**/*.test.{ts,tsx}"],
          // environment: "jsdom",
          // Attempt to use playwright for unit tests as well
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});

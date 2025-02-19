import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  source: {
    entry: {
      iframeIndex: "./src/iframe/index.ts",
      iframe: "./src/iframe/iframe.ts",
      windowIndex: "./src/window/index.ts",
      window: "./src/window/window.ts",
      workerIndex: "./src/worker/index.ts",
      sharedWorkerIndex: "./src/sharedWorker/index.ts",
      serviceWorkerIndex: "./src/serviceWorker/index.ts",
    },
  },
  output: {
    distPath: {
      root: "dist",
      html: ".",
      js: ".",
      jsAsync: ".",
    },
  },
});

// Use `import` instead of `require`
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Node event listeners go here
    },
    baseUrl: "http://localhost:8080",
    specPattern: "cypress/integration/**/*.spec.js",
    video: false, // disable video recording if not needed
  },
});

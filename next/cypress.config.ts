import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  env: {
    MAILPIT_URL: "http://mail.lndo.site",
    FRONTEND_URL: "https://frontend.lndo.site",
    BACKEND_URL: "https://backend.lndo.site",
  },
});

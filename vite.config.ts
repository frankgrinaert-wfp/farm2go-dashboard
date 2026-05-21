import { copyFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/** GitHub Pages project site: https://<user>.github.io/farm2go-dashboard/ */
const GITHUB_PAGES_BASE = "/farm2go-dashboard/";

function ghPagesSpaFallback(): Plugin {
  return {
    name: "gh-pages-spa-fallback",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      copyFileSync(
        path.join(distDir, "index.html"),
        path.join(distDir, "404.html"),
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: GITHUB_PAGES_BASE,
  plugins: [react(), tailwindcss(), ghPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

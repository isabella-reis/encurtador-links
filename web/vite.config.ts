import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/short-links": "http://localhost:3333",
      // redirecionamento dinâmico do shortCode
      "^/[a-zA-Z0-9_-]+$": "http://localhost:3333",
    },
  },
});

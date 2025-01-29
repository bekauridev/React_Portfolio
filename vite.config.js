import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress", // Use 'gzip' for Gzip compression
      ext: ".br", // File extension for Brotli compressed files
      threshold: 1024, // Only compress files larger than 1KB
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz", // File extension for Gzip compressed files
      threshold: 1024,
    }),
  ],
  optimizeDeps: {
    exclude: ["@use-gesture/react"],
  },
});

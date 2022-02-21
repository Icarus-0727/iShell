import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

let flag = true;

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  base: "/",
  plugins: [vue()],
  publicDir: "public",
  build: {
    target: "modules",
    outDir: "./dist",
    assetsDir: "./assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {},
    write: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    commonjsOptions: {},
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "pages/home/index.html"),
      },
      output: {
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
});

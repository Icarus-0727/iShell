import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  base: "/",
  plugins: [vue()],
  publicDir: "public",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "components/"),
      "@route": path.resolve(__dirname, "route/"),
      "@utils": path.resolve(__dirname, "utils/"),
    },
  },
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
        connMgr: path.resolve(__dirname, "pages/connMgr/index.html"),
        connEditor: path.resolve(__dirname, "pages/connEditor/index.html"),
        pluginSysInfo: path.resolve(__dirname, "plugin/sysinfo/index.html"),
      },
      output: {
        assetFileNames: "[ext]/[name]-[hash].[ext]",
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
      },
    },
  },
});

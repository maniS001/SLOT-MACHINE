import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Keep JS in "assets/js"
        entryFileNames: "assets/js/[name].[hash].js",
        chunkFileNames: "assets/js/[name].[hash].js",
        // Keep CSS in "assets/css"
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) {
            return "assets/css/[name].[hash][extname]";
          }
          // Keep images in "assets/images"
          if (name && /\.(png|jpe?g|svg|gif|webp)$/.test(name)) {
            return "assets/images/[name].[hash][extname]";
          }
          // Default (fonts, etc.)
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },
});

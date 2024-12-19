import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            input: {
                app: resolve(__dirname, "src/main.ts"),
                serviceWorker: resolve(__dirname, "src/lib/service-worker.ts"),
                main: resolve(__dirname, '/index.html')
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "serviceWorker") {
                        return "assets/service-worker.js";
                    }

                    return "assets/[name]-[hash].js";
                },
            },
        },
    },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@style": path.resolve(__dirname, "./src/style.js"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@image": path.resolve(__dirname, "./src/image"),
        },
    },
    plugins: [react()],
});

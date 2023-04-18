/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        sourcemap: true,
    },
    plugins: [react({ jsxImportSource: "@emotion/react" })],
});

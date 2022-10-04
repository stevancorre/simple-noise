import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    minify: true,
    clean: true,
    dts: true,
});

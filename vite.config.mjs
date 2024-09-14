import { crossOriginIsolation } from "./config/vite/cross-origin-isolation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		crossOriginIsolation(), // eslint-disable-line @typescript-eslint/no-unsafe-call
	],
});

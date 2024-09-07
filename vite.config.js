import { crossOriginIsolation } from "./config/vite/cross-origin-isolation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), crossOriginIsolation()],
});

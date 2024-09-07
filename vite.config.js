import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			name: "response-headers",
			configureServer: (server) => {
				server.middlewares.use((_request, response, next) => {
					response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
					response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
					next();
				});
			},
		},
	],
});

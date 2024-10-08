/* eslint-disable @typescript-eslint/no-unsafe-call  */
/* eslint-disable @typescript-eslint/no-unsafe-member-access  */
export function crossOriginIsolation() {
	return {
		name: "cross-origin-isolation",
		configureServer: (server) => {
			server.middlewares.use((_request, response, next) => {
				response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
				response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
				next();
			});
		},
	};
}

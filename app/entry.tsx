import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

const container = document.querySelector("#app");
const root = createRoot(container!);

const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>,
);

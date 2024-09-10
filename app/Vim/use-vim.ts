import * as React from "react";
import { VimWasm } from "vim-wasm";
import worker from "vim-wasm/vim.js?url";

type UseVimOptions = {
	fetchFiles: Record<string, string>;
};

type UseVimResult = {
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setInput: (input: HTMLInputElement) => void;
	vim: VimWasm | undefined;
};

export function useVim(options: UseVimOptions): UseVimResult {
	const [vim, setVim] = React.useState<VimWasm>();
	const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
	const [input, setInput] = React.useState<HTMLInputElement>();

	React.useEffect(() => {
		if (canvas !== undefined && input !== undefined && vim === undefined) {
			const newVim = new VimWasm({
				workerScriptPath: worker,
				canvas,
				input,
			});
			newVim.start({
				fetchFiles: options.fetchFiles,
				cmdArgs: [Object.keys(options.fetchFiles)[0]],
			});
			newVim.cmdline("set number");
			setVim(newVim);
		}
	}, [canvas, input, options.fetchFiles, vim]);

	return {
		setCanvas,
		setInput,
		vim,
	};
}

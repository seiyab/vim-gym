import * as React from "react";
import { VimWasm } from "vim-wasm";
import worker from "vim-wasm/vim.js?url";

type UseVimResult = {
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setInput: (input: HTMLInputElement) => void;
	vim: VimWasm | undefined;
};

export function useVim(): UseVimResult {
	const [vim, setVim] = React.useState<VimWasm>();
	const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
	const [input, setInput] = React.useState<HTMLInputElement>();

	React.useEffect(() => {
		if (canvas !== undefined && input !== undefined) {
			const newVim = new VimWasm({
				workerScriptPath: worker,
				canvas,
				input,
			});
			newVim.start();
			setVim(newVim);
		}
	}, [canvas, input]);

	return {
		setCanvas,
		setInput,
		vim,
	};
}

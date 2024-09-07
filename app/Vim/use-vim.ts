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
			newVim.cmdline("set number");
			setVim(newVim);
		}
	}, [canvas, input]);

	React.useEffect(() => {
		const resize = () => {
			vim?.resize(300, 300);
		};
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, [vim]);

	return {
		setCanvas,
		setInput,
		vim,
	};
}

import { formatCodeArrayBuffer } from "@app/format";
import * as React from "react";
import { VimWasm } from "vim-wasm";
import worker from "vim-wasm/vim.js?url";

type UseVimOptions = {
	files: Record<string, string>;
	onSave?: (fileName: string, fileContent: ArrayBuffer) => void;
};

type UseVimResult = {
	setCanvas: (canvas: HTMLCanvasElement) => void;
	setInput: (input: HTMLInputElement) => void;
	vim: VimWasm | undefined;
};

export function useVim(options: UseVimOptions): UseVimResult {
	const [files] = React.useState(options.files);
	const [vim, setVim] = React.useState<VimWasm>();
	const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
	const [input, setInput] = React.useState<HTMLInputElement>();
	const onSaveRef = React.useRef(options.onSave);
	onSaveRef.current = options.onSave;

	React.useEffect(() => {
		if (canvas !== undefined && input !== undefined && vim === undefined) {
			const newVim = new VimWasm({
				workerScriptPath: worker,
				canvas,
				input,
			});
			newVim.start({
				files,
				cmdArgs: [Object.keys(files)[0]],
			});
			void (async () => {
				await newVim.cmdline("set number");
				await newVim.cmdline("autocmd BufWritePost * :export");
				newVim.onFileExport = (fullpath, contents) => {
					onSaveRef.current?.(fullpath, contents);
					void (async () => {
						await newVim.dropFile(
							fullpath,
							await formatCodeArrayBuffer(contents),
						);
					})();
				};
				setVim(newVim);
			})();
		}
	}, [canvas, input, files, vim]);

	return {
		setCanvas,
		setInput,
		vim,
	};
}

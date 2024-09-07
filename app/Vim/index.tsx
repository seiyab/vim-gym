import { useVim } from "./use-vim";

export function Vim() {
	const { setCanvas, setInput } = useVim();
	return (
		<div>
			<canvas ref={setCanvas}></canvas>
			<input ref={setInput} autoComplete="off"></input>
		</div>
	);
}

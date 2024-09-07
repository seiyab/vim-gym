import classes from "./style.module.css";
import { useVim } from "./use-vim";

export function Vim() {
	const { vim, setCanvas, setInput } = useVim();
	return (
		<div>
			<input
				autoFocus
				className={classes.input}
				ref={setInput}
				autoComplete="off"
			></input>
			<canvas
				className={classes.canvas}
				ref={setCanvas}
				onFocus={() => vim?.focus()}
			></canvas>
		</div>
	);
}

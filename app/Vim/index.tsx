import classes from "./style.module.css";
import { useVim } from "./use-vim";
import * as React from "react";

type Props = {
	fileName: string;
	fileContent: string;
	onSave: (fileName: string, fileContent: ArrayBuffer) => void;
};

export function Vim({ fileName, fileContent, onSave }: Props): React.ReactNode {
	const { vim, setCanvas, setInput } = useVim({
		files: {
			[fileName]: fileContent,
		},
		onSave,
	});
	const { setElement: setContainer } = useResizeObserver((width, height) => {
		vim?.resize(width, height);
	});
	return (
		<div ref={setContainer} className={classes.container}>
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

type UseResizeObserverResult = {
	setElement: (element: HTMLElement | null) => void;
};

function useResizeObserver(
	effect: (width: number, height: number) => void,
): UseResizeObserverResult {
	const [element, setElement] = React.useState<HTMLElement | null>();
	const observer = React.useRef<ResizeObserver>();
	React.useEffect(() => {
		observer.current = new ResizeObserver((entries) => {
			for (const entry of entries) {
				effect(entry.contentRect.width, entry.contentRect.height);
			}
		});
	}, [effect, element]);
	React.useEffect(() => {
		if (element) {
			observer.current?.observe(element);
			return () => observer.current?.unobserve(element);
		}
	}, [element]);
	return {
		setElement,
	};
}

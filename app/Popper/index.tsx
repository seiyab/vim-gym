import { Confetti } from "./Confetti";
import classes from "./style.module.css";
import * as React from "react";

type Props = {
	children: React.ReactNode;
};

export function Popper({ children }: Props): React.ReactNode {
	const [show, setShow] = React.useState(false);
	return (
		<div className={classes.container} onClick={() => setShow(true)}>
			{children}
			{show && (
				<div className={classes.popperScreen}>
					{Array.from({ length: 30 }).map((_, index) => (
						<Confetti key={index} position="left" />
					))}
					{Array.from({ length: 30 }).map((_, index) => (
						<Confetti key={index} position="right" />
					))}
				</div>
			)}
		</div>
	);
}

Popper satisfies React.FC<Props>;

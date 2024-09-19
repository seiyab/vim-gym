import { Confetti } from "./Confetti";
import classes from "./style.module.css";
import * as React from "react";

type Props = {
	showConfetti: boolean;
	children: React.ReactNode;
};

export function ConfettiScreen({
	children,
	showConfetti,
}: Props): React.ReactNode {
	return (
		<div className={classes.container}>
			{children}
			{showConfetti && (
				<div className={classes.screen}>
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

ConfettiScreen satisfies React.FC<Props>;

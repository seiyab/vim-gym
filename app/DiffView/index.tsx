import classes from "./style.module.css";
import { diff } from "@app/diff";
import classNames from "classnames";
import type { FC } from "react";

type Props = {
	left: string;
	right: string;
};

export function DiffView({ left, right }: Props) {
	const d = diff(left.split("\n"), right.split("\n"));
	return (
		<div className={classes.container}>
			{d.map((line, index) => (
				<div
					key={index}
					className={classNames(classes.row, {
						[classes.green]:
							line.right !== undefined && line.left === undefined,
						[classes.red]: line.left !== undefined && line.right === undefined,
					})}
				>
					<pre className={classes.pre}>{line.left ?? line.right}</pre>
				</div>
			))}
		</div>
	);
}

DiffView satisfies FC<Props>;

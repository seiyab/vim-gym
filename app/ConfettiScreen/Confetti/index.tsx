import classes from "./style.module.css";
import { useSpring, animated, easings } from "@react-spring/web";
import * as React from "react";

type Props = {
	position: "left" | "right";
};

export const durationMs = 3000;

function Confetti({ position }: Props): React.ReactNode {
	const [r] = React.useState(() => 0.3 + 0.7 * Math.random());
	const [dr] = React.useState(() => 0.9 + 0.1 * Math.random());
	const [[xr, yr]] = React.useState(() => [
		Math.random() * 2 - 1,
		Math.random() * 2 - 1,
	]);
	const [color] = React.useState(() => {
		const h = Math.random();
		return `hsl(${h * 360}, ${50 + Math.random() * 50}%, ${50 + Math.random() * 10}%)`;
	});
	const { t } = useSpring({
		from: { t: 0 },
		to: { t: 1 },
		config: { duration: durationMs * dr, easing: easings.easeOutExpo },
	});

	return (
		<animated.div
			className={classes.confetti}
			style={{
				backgroundColor: color,
				[position]: t.to((t) => `${(t * 80 * r + xr * 10).toFixed(1)}%`),
				top: t.to(
					(t) => `${(((t - 0.5) * 2) ** 2 * 100 + yr * 30 + 10).toFixed(1)}%`,
				),
				rotate: t.to((t) => `${t * 1800}deg`),
			}}
		/>
	);
}

Confetti satisfies React.FC<Props>;

export { Confetti };

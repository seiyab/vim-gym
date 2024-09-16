import "./reset.css";
import classes from "./style.module.css";
import { Game } from "@app/Game";

export function App() {
	return (
		<div>
			<div className={classes.header}>Vim Gym</div>
			<main className={classes.main}>
				<Game />
			</main>
		</div>
	);
}

import "./reset.css";
import classes from "./style.module.css";
import Workspace from "@app/Workspace";

export function App() {
	return (
		<div>
			<div className={classes.header}>Vim Gym</div>
			<main className={classes.main}>
				<Workspace />
			</main>
		</div>
	);
}

import { Vim } from "../Vim";
import "./reset.css";
import classes from "./style.module.css";

export function App() {
	return (
		<div>
			<div className={classes.header}>Vim Gym</div>
			<Vim />
		</div>
	);
}

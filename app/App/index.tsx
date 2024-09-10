import { Vim } from "../Vim";
import "./reset.css";
import classes from "./style.module.css";

export function App() {
	return (
		<div className={classes.app}>
			<div className={classes.header}>
				<div>Vim Gym</div>
			</div>
			<main className={classes.main}>
				<div>
					<div>
						<Vim />
					</div>
					<div />
				</div>
			</main>
		</div>
	);
}

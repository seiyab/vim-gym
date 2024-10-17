import { durationMs } from "@app/ConfettiScreen/Confetti";
import Workspace from "@app/Workspace";
import { tasks } from "@app/tasks";
import * as React from "react";

export function Game() {
	const [taskIndex, setTaskIndex] = React.useState(0);
	const task = tasks[taskIndex];

	return (
		<Workspace
			key={taskIndex}
			task={task}
			onDone={() => {
				setTimeout(() => {
					setTaskIndex((p) => (p + 1) % tasks.length);
				}, durationMs * 0.4);
			}}
		/>
	);
}

import Workspace from "@app/Workspace";
import { tasks } from "@app/tasks";
import * as React from "react";

export function Game() {
	const [taskIndex, setTaskIndex] = React.useState(0);
	const task = tasks[taskIndex];

	return (
		<Workspace
			key={taskIndex}
			beforeURL={task.before}
			afterURL={task.after}
			onDone={() => setTaskIndex((p) => (p + 1) % tasks.length)}
		/>
	);
}

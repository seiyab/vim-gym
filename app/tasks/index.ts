import task1After from "@app/data/task-1/after.ts.txt?url";
import task1Before from "@app/data/task-1/before.ts.txt?url";
import task2After from "@app/data/task-2/after.ts.txt?url";
import task2Before from "@app/data/task-2/before.ts.txt?url";
import task3After from "@app/data/task-3/after.ts.txt?url";
import task3Before from "@app/data/task-3/before.ts.txt?url";

export const tasks: Task[] = [
	{
		before: task1Before,
		after: task1After,
	},
	{
		before: task2Before,
		after: task2After,
	},
	{
		before: task3Before,
		after: task3After,
	},
];

type Task = {
	before: string;
	after: string;
};

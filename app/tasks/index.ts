import digdag1506After from "@app/data/digdag-1506/after.ts.txt?url";
import digdag1506Before from "@app/data/digdag-1506/before.ts.txt?url";
import prettier14587After from "@app/data/prettier-14587/after.js.txt?url";
import prettier14587Before from "@app/data/prettier-14587/before.js.txt?url";
import that19c2860After from "@app/data/that-19c2860/after.ts.txt?url";
import that19c2860Before from "@app/data/that-19c2860/before.ts.txt?url";

export const tasks: Task[] = [
	{
		before: digdag1506Before,
		after: digdag1506After,
	},
	{
		before: prettier14587Before,
		after: prettier14587After,
	},
	{
		before: that19c2860Before,
		after: that19c2860After,
	},
];

type Task = {
	before: string;
	after: string;
};

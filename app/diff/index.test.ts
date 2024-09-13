import { diff } from ".";
import { expect, test } from "vitest";

test("diff", () => {
	expect(diff(["a", "b", "c"], ["a", "b", "d"])).toEqual([
		{ left: 0, right: 0 },
		{ left: 1, right: 1 },
		{ left: 2 },
		{ right: 2 },
	]);

	expect(diff(["a", "b", "c"], ["a", "c"])).toEqual([
		{ left: 0, right: 0 },
		{ left: 1 },
		{ left: 2, right: 1 },
	]);
});

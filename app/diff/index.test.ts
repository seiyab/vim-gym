import { diff } from ".";
import { expect, test } from "vitest";

test("diff", () => {
	expect(diff(["a", "b", "c"], ["a", "b", "d"])).toEqual([
		{ left: "a", right: "a" },
		{ left: "b", right: "b" },
		{ left: "c" },
		{ right: "d" },
	]);

	expect(diff(["a", "b", "c"], ["a", "c"])).toEqual([
		{ left: "a", right: "a" },
		{ left: "b" },
		{ left: "c", right: "c" },
	]);

	expect(diff(["a", "c", "b", "c"], ["a", "b", "c"])).toEqual([
		{ left: "a", right: "a" },
		{ left: "c" },
		{ left: "b", right: "b" },
		{ left: "c", right: "c" },
	]);

	expect(diff(["a", "b", "c"], ["a", "c", "b", "c"])).toEqual([
		{ left: "a", right: "a" },
		{ right: "c" },
		{ left: "b", right: "b" },
		{ left: "c", right: "c" },
	]);
});

import { diff } from ".";
import { expect, test } from "vitest";

test("diff", () => {
	expect(diff(["a", "b", "c"], ["a", "b", "d"])).toEqual([
		{ type: "same", content: "a" },
		{ type: "same", content: "b" },
		{ type: "left", content: "c" },
		{ type: "right", content: "d" },
	]);

	expect(diff(["a", "b", "c"], ["a", "c"])).toEqual([
		{ type: "same", content: "a" },
		{ type: "left", content: "b" },
		{ type: "same", content: "c" },
	]);

	expect(diff(["a", "c", "b", "c"], ["a", "b", "c"])).toEqual([
		{ type: "same", content: "a" },
		{ type: "left", content: "c" },
		{ type: "same", content: "b" },
		{ type: "same", content: "c" },
	]);

	expect(diff(["a", "b", "c"], ["a", "c", "b", "c"])).toEqual([
		{ type: "same", content: "a" },
		{ type: "right", content: "c" },
		{ type: "same", content: "b" },
		{ type: "same", content: "c" },
	]);
});

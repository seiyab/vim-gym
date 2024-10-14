import { diff } from ".";
import { richDiff } from "./rich-diff";
import { code } from "@app/utils/strings/code";
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

	expect(diff(["a"], ["b"])).toEqual([
		{ type: "left", content: "a" },
		{ type: "right", content: "b" },
	]);

	expect(diff(["a", "b", "b", "c"], ["b"])).toEqual([
		{ type: "left", content: "a" },
		{ type: "same", content: "b" },
		{ type: "left", content: "b" },
		{ type: "left", content: "c" },
	]);

	expect(diff(["b"], ["a", "b", "b", "c"])).toEqual([
		{ type: "right", content: "a" },
		{ type: "same", content: "b" },
		{ type: "right", content: "b" },
		{ type: "right", content: "c" },
	]);

	expect(diff([], [])).toEqual([]);

	expect(diff(["a"], [])).toEqual([{ type: "left", content: "a" }]);

	expect(diff([], ["a"])).toEqual([{ type: "right", content: "a" }]);
});

test("richDiff", () => {
	expect(
		richDiff(
			code`
			const foo = "abcdef";
			// foobar
			let bar = "qwerty";
			`.split("\n"),
			code`
			const baz = "abcdef";
			// foobar
			const bar = "asdf";
			`.split("\n"),
		),
	).toEqual([
		{
			type: "left",
			content: [
				{ type: "shared", content: "const " },
				{ type: "owned", content: "foo" },
				{ type: "shared", content: ' = "abcdef";' },
			],
		},
		{
			type: "right",
			content: [
				{ type: "shared", content: "const " },
				{ type: "owned", content: "baz" },
				{ type: "shared", content: ' = "abcdef";' },
			],
		},
		{
			type: "same",
			content: [{ type: "shared", content: "// foobar" }],
		},
		{
			type: "left",
			content: [
				{ type: "owned", content: "le" },
				{ type: "shared", content: 't bar = "' },
				{ type: "owned", content: "qwerty" },
				{ type: "shared", content: '";' },
			],
		},
		{
			type: "right",
			content: [
				{ type: "owned", content: "cons" },
				{ type: "shared", content: 't bar = "' },
				{ type: "owned", content: "asdf" },
				{ type: "shared", content: '";' },
			],
		},
	] satisfies ReturnType<typeof richDiff>);

	expect(
		richDiff(
			code`
			abcde
			fghij
			klmno
			pqrst
			`.split("\n"),
			code`
			i
			`.split("\n"),
		),
	).toEqual([
		{
			type: "left",
			content: [{ type: "owned", content: "abcde" }],
		},
		{
			type: "left",
			content: [
				{ type: "owned", content: "fgh" },
				{ type: "shared", content: "i" },
				{ type: "owned", content: "j" },
			],
		},
		{
			type: "right",
			content: [{ type: "shared", content: "i" }],
		},
		{
			type: "left",
			content: [{ type: "owned", content: "klmno" }],
		},
		{
			type: "left",
			content: [{ type: "owned", content: "pqrst" }],
		},
	]);
});

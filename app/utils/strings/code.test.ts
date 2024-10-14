import { code } from "./code";
import { describe, expect, test } from "vitest";

describe("code", () => {
	test("flat", () => {
		expect(code`
               const a = 1;
               let b = 2;
               const c = a + b;
               `).toEqual(
			[
				"const a = 1;",
				"let b = 2;",
				"const c = a + b;",
				// don't flatten this array, prettier.
			].join("\n"),
		);
	});

	test("nested", () => {
		expect(code`
            {
                "a": {
                    "b": 1
                },
                "c": 1
            }
            `).toEqual(
			[
				"{",
				`    "a": {`,
				`        "b": 1`,
				`    },`,
				`    "c": 1`,
				`}`,
				//
			].join("\n"),
		);
	});
});

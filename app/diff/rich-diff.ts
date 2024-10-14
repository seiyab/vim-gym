import { diff } from "./diff";

type DiffElement = {
	type: "same" | "left" | "right";
	content: InlineDiffElement[];
};

type InlineDiffElement = {
	type: "shared" | "owned";
	content: string;
};

export function richDiff(left: string[], right: string[]): DiffElement[] {
	const lineDiff = diff(left, right);
	const lines: DiffElement[] = [];
	let pending: ReturnType<typeof diff> = [];
	for (const l of lineDiff) {
		if (l.type !== "same") {
			pending.push(l);
			continue;
		}
		flush();
		lines.push({
			type: "same",
			content: [{ type: "shared", content: l.content }],
		});
	}
	flush();

	return lines;

	function flush() {
		lines.push(...matchLines(pending));
		pending = [];
	}
}

function matchLines(elements: ReturnType<typeof diff>): DiffElement[] {
	const left = lines("left");
	const right = lines("right");
	const table = dp(left, right);
	return reconstruct(table);

	function lines(type: "left" | "right") {
		return elements
			.filter((item) => item.type === type)
			.map((item) => item.content);
	}
}

type DPCell = {
	pos: Position;
	value: CellValue;
	back: Position;
	score: number;
};

type Position = [number, number];

type CellValue = Lonely | Pair;

type Lonely = {
	type: "lonely";
	source: "left" | "right";
	content: string;
};

type Pair = {
	type: "pair";
	left: InlineDiffElement[];
	right: InlineDiffElement[];
};

function dp(left: string[], right: string[]): DPCell[][] {
	const table: DPCell[][] = [
		[
			{
				pos: [0, 0],
				back: [-1, -1],
				value: { type: "pair", left: [], right: [] },
				score: 0,
			},
		],
	];
	for (const r of right.values()) {
		const previous = table[0].at(-1)!;
		const pos: Position = [0, table[0].length];
		table[0].push({
			pos,
			value: {
				type: "lonely",
				source: "right",
				content: r,
			},
			back: previous.pos,
			score: previous.score,
		});
	}
	for (const l of left) {
		const row: DPCell[] = [
			{
				pos: [table.length, 0],
				value: {
					type: "lonely",
					source: "left",
					content: l,
				},
				back: [table.length - 1, 0],
				score: table.at(-1)![0].score,
			},
		];
		for (const r of right) {
			const pos: Position = [table.length, row.length];
			const previous1 = row.at(-1)!;
			const candidate1: DPCell = {
				pos,
				value: {
					type: "lonely",
					source: "right",
					content: r,
				},
				back: previous1.pos,
				score: previous1.score,
			};
			const previous2 = table.at(-1)![pos[1]];
			const candidate2: DPCell = {
				pos,
				value: {
					type: "lonely",
					source: "left",
					content: l,
				},
				back: previous2.pos,
				score: previous2.score,
			};
			const previous3 = table.at(-1)![pos[1] - 1];
			const d = diff([...l], [...r]);
			const candidate3: DPCell = {
				pos,
				value: pairInlineDiff(d),
				back: previous3.pos,
				score: previous3.score + d.filter((l) => l.type === "same").length,
			};
			let best = candidate1;
			for (const candidate of [candidate1, candidate2, candidate3]) {
				if (candidate.score > best.score) {
					best = candidate;
				}
			}
			row.push(best);
		}
		table.push(row);
	}
	return table;
}

function pairInlineDiff(d: ReturnType<typeof diff>): Pair {
	const left: Pair["left"] = [];
	const right: Pair["right"] = [];
	let mode: "same" | "right" | "left" = "same";
	let pending: ReturnType<typeof diff> = [];
	for (const c of d) {
		if (mode !== c.type) {
			flush();
			mode = c.type;
		}
		pending.push(c);
	}
	flush();

	return { type: "pair", left, right };

	function flush() {
		const content = pending.map((p) => p.content).join("");
		if (content === "") {
			pending = [];
			return;
		}
		switch (mode) {
			case "same": {
				left.push({ type: "shared", content });
				right.push({ type: "shared", content });
				break;
			}
			case "left": {
				left.push({ type: "owned", content });
				break;
			}
			case "right": {
				right.push({ type: "owned", content });
				break;
			}
			default: {
				mode satisfies never;
			}
		}
		pending = [];
	}
}

function reconstruct(table: DPCell[][]): DiffElement[] {
	const diff: DiffElement[] = [];
	let [l, r] = [table.length - 1, table[0].length - 1];
	while (l > 0 || r > 0) {
		const cell = table[l][r];
		const { value } = cell;
		switch (value.type) {
			case "lonely": {
				diff.push({
					type: value.source,
					content: [{ type: "owned", content: value.content }],
				});
				break;
			}
			case "pair": {
				diff.push(
					{ type: "right", content: value.right },
					{ type: "left", content: value.left },
				);
				break;
			}
			default: {
				value satisfies never;
			}
		}
		[l, r] = cell.back;
	}
	return diff.reverse();
}

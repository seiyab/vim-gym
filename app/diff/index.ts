type DiffElement = {
	type: "same" | "left" | "right";
	content: string;
};

export function diff(left: string[], right: string[]): DiffElement[] {
	const table = dp(left, right);
	return reconstruct(table);
}

type DPCell = {
	pos: Position;
	value: string;
	back: Position;
	score: number;
};

type Position = [number, number];

function dp(left: string[], right: string[]): DPCell[][] {
	const table: DPCell[][] = [
		[{ pos: [0, 0], back: [-1, -1], value: "", score: 0 }],
	];
	for (const r of right.values()) {
		const previous = table[0].at(-1)!;
		const pos: Position = [0, table[0].length];
		table[0].push({
			pos,
			value: r,
			back: previous.pos,
			score: previous.score,
		});
	}
	for (const l of left) {
		const row: DPCell[] = [
			{
				pos: [table.length, 0],
				value: l,
				back: [table.length - 1, 0],
				score: table.at(-1)![0].score,
			},
		];
		for (const r of right) {
			const pos: Position = [table.length, row.length];
			const previous1 = row.at(-1)!;
			const candidate1: DPCell = {
				pos,
				value: r,
				back: previous1.pos,
				score: previous1.score,
			};
			const previous2 = table.at(-1)![pos[1]];
			const candidate2: DPCell = {
				pos,
				value: l,
				back: previous2.pos,
				score: previous2.score,
			};
			const previous3 = table.at(-1)![pos[1] - 1];
			const candidate3: DPCell =
				l === r
					? {
							pos,
							value: l,
							back: previous3.pos,
							score: previous3.score + 1,
						}
					: {
							pos,
							value: "",
							back: [-1, -1],
							score: -1,
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

function reconstruct(table: DPCell[][]): DiffElement[] {
	const diff: DiffElement[] = [];
	let [l, r] = [table.length - 1, table[0].length - 1];
	while (l > 0 || r > 0) {
		const cell = table[l][r];
		const [previousL, previousR] = cell.back;
		if (previousL === l - 1 && previousR === r - 1) {
			diff.push({ type: "same", content: cell.value });
		} else if (previousL === l) {
			diff.push({ type: "right", content: cell.value });
		} else if (previousR === r) {
			diff.push({ type: "left", content: cell.value });
		}
		[l, r] = cell.back;
	}
	return diff.reverse();
}

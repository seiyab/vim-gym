type DiffElement = {
	type: "same" | "left" | "right";
	content: string;
};

export function diff(left: string[], right: string[]): DiffElement[] {
	const table = dp(left, right);
	return reconstruct(table, left, right);
}

type DPCell = {
	back: [number, number];
	score: number;
};

const zeroCell: DPCell = { back: [-1, -1], score: 0 };

function dp(left: string[], right: string[]): DPCell[][] {
	const table: DPCell[][] = [];
	for (const [lIndex, l] of left.entries()) {
		const row: DPCell[] = [];
		for (const [rIndex, r] of right.entries()) {
			const previous1 = row.at(-1) ?? zeroCell;
			const candidate1: DPCell = {
				back: [lIndex, rIndex - 1],
				score: previous1.score,
			};
			const previous2 = table.at(-1)?.at(rIndex) ?? zeroCell;
			const candidate2: DPCell = {
				back: [lIndex - 1, rIndex],
				score: previous2.score,
			};
			const previous3 = table.at(-1)?.at(rIndex - 1) ?? zeroCell;
			const candidate3: DPCell =
				l === r
					? {
							back: [lIndex - 1, rIndex - 1],
							score: previous3.score + 1,
						}
					: {
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

function reconstruct(
	table: DPCell[][],
	left: string[],
	right: string[],
): DiffElement[] {
	const diff: DiffElement[] = [];
	let [l, r] = [left.length - 1, right.length - 1];
	while (l >= 0 && r >= 0) {
		const cell = table[l][r];
		const [previousL, previousR] = cell.back;
		if (previousL === l - 1 && previousR === r - 1) {
			diff.push({ type: "same", content: left[l] });
		} else if (previousL === l) {
			diff.push({ type: "right", content: right[r] });
		} else if (previousR === r) {
			diff.push({ type: "left", content: left[l] });
		}
		[l, r] = cell.back;
	}
	return diff.reverse();
}

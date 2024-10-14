export function code(s: TemplateStringsArray): string {
	const trimmed = s.join("");
	const lines = trimmed.split("\n");
	let indent: string | undefined;
	for (const l of lines) {
		const p = l.match(/^\s*/)?.at(0) ?? "";
		if (p === l) continue;
		if (indent === undefined) {
			indent = p;
			continue;
		}
		indent = longestCommonPrefix(indent, p);
	}
	const aligned = lines.map((l) => l.replace(new RegExp(`^${indent}`), ""));
	let [l, r] = [0, aligned.length];
	while (aligned.at(l)?.replace(/^\s*/, "") === "") l++;
	while (aligned.at(r - 1)?.replace(/^\s*/, "") === "") r--;
	return aligned.slice(l, r).join("\n");
}

function longestCommonPrefix(a: string, b: string) {
	const r: string[] = [];
	for (const index of [...a].keys()) {
		if (index >= b.length) break;
		if (a[index] !== b[index]) break;
		r.push(a[index]);
	}
	return r.join("");
}

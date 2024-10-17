export const otherwise = Symbol("match.otherwise");

export function match<K extends string, V>(
	key: K,
	cases: Record<K | typeof otherwise, V>,
): V {
	return cases[key] ?? cases[otherwise];
}

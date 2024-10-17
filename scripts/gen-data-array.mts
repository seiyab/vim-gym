// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { match, otherwise } from "../app/utils/match.ts";
import * as fs from "node:fs";
import path from "node:path";
import * as prettier from "prettier";
import * as prettierPluginTypeScript from "prettier/plugins/typescript.js";

async function main() {
	const root: string = path.dirname(import.meta.dirname);
	const outContent = await prettier.format(content(root), {
		parser: "typescript",
		plugins: [prettierPluginTypeScript],
	});
	const outPath = path.join(root, "app", "tasks", "index.ts");
	fs.writeFileSync(outPath, outContent);
}

function content(root: string): string {
	const data: string = path.join(root, "app", "data");
	const importLines: string[] = [];
	const lines: string[] = ["export const tasks: Task[] = ["];
	const identifier = new IdentifierFactory("url");
	for (const task of fs.readdirSync(data)) {
		const beforeName = identifier.create();
		const afterName = identifier.create();
		const files = fs.readdirSync(path.join(data, task));
		const beforeFile = files.find((f) => f.startsWith("before"))!;
		const afterFile = files.find((f) => f.startsWith("after"))!;
		importLines.push(
			`import ${beforeName} from "${path.join("@app", "data", task, beforeFile)}?url";`,
			`import ${afterName} from "${path.join("@app", "data", task, afterFile)}?url";`,
		);
		lines.push(
			"{",
			`before: ${beforeName},`,
			`after: ${afterName},`,
			`parser: "${inferParser(beforeFile)}"`,
			"},",
		);
	}
	lines.push(
		"]",
		"",
		"type Task = {",
		"before: string;",
		"after: string;",
		"parser: string;",
		"};",
	);
	return [...importLines, "", ...lines].join("\n");
}

function inferParser(name: string): string {
	const extension = name
		.replace(/\.txt$/, "")
		.split(".")
		.at(-1);
	return match(extension ?? "ts", {
		ts: "typescript",
		css: "css",
		[otherwise]: "typescript",
	});
}

class IdentifierFactory {
	private counter: number;
	private prefix: string;
	constructor(prefix: string) {
		this.prefix = prefix;
		this.counter = 0;
	}

	create(): string {
		return `${this.prefix}${this.counter++}`;
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
await main();

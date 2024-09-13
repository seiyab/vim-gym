import * as prettier from "prettier-runtime";
import * as prettierPluginESTree from "prettier-runtime/plugins/estree.js";
import * as prettierPluginTypeScript from "prettier-runtime/plugins/typescript.js";

async function formatCode(code: string): Promise<string> {
	return await prettier.format(code, {
		parser: "typescript",
		plugins: [prettierPluginTypeScript, prettierPluginESTree],
	});
}

export async function formatCodeArrayBuffer(
	code: ArrayBuffer,
): Promise<ArrayBuffer> {
	const decoder = new TextDecoder();
	const encoder = new TextEncoder();
	const formatted = await formatCode(decoder.decode(code));
	return encoder.encode(formatted).buffer;
}

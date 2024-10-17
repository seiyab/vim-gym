import * as prettier from "prettier-runtime";
import * as prettierPluginESTree from "prettier-runtime/plugins/estree.js";
import * as prettierPluginPostCSS from "prettier-runtime/plugins/postcss.js";
import * as prettierPluginTypeScript from "prettier-runtime/plugins/typescript.js";

export async function formatCode(
	code: string,
	parser: string,
): Promise<string> {
	try {
		return await prettier.format(code, {
			parser,
			plugins: [
				prettierPluginTypeScript,
				prettierPluginESTree,
				prettierPluginPostCSS,
			],
		});
	} catch {
		return code;
	}
}

export async function formatCodeArrayBuffer(
	code: ArrayBuffer,
	parser: string,
): Promise<ArrayBuffer> {
	const decoder = new TextDecoder();
	const encoder = new TextEncoder();
	const formatted = await formatCode(decoder.decode(code), parser);
	return encoder.encode(formatted).buffer;
}

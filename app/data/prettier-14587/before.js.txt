function markTsScript(ast, options) {
	if (options.parser === "vue") {
		const vueScriptTag = ast.children.find((child) =>
			isVueScriptTag(child, options),
		);
		if (!vueScriptTag) {
			return;
		}
		const { lang } = vueScriptTag.attrMap;
		if (lang === "ts" || lang === "typescript") {
			options.__should_parse_vue_template_with_ts = true;
		}
	}
}

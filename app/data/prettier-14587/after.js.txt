function markTsScript(ast, options) {
	options.__should_parse_vue_template_with_ts =
		options.parser === "vue" &&
		ast.children.some(
			(child) =>
				isVueScriptTag(child, options) &&
				["ts", "typescript"].includes(child.attrMap.lang),
		);
}

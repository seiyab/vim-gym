import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import * as eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		plugins: { "react-hooks": fixupPluginRules(eslintPluginReactHooks) },
		rules: {
			...eslintPluginReactHooks.configs.recommended.rules,
			"react-hooks/exhaustive-deps": "error",
		},
	},
	{ settings: { react: { version: "detect" } } },
	eslintPluginUnicorn.configs["flat/recommended"],
];

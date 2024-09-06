import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { fixupPluginRules } from "@eslint/compat";
import * as eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

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

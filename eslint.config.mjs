import { languageOptions } from "./config/eslint/language-options.mjs";
import { myUnicorn } from "./config/eslint/my-unicorn.mjs";
import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import * as eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

// FIXME
/* eslint-disable @typescript-eslint/no-unsafe-assignment  */
/* eslint-disable @typescript-eslint/no-unsafe-member-access  */

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ ignores: ["app/data/"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	languageOptions,
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
	...myUnicorn,
];

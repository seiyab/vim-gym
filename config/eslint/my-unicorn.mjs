import eslintPluginUnicorn from "eslint-plugin-unicorn";

export const myUnicorn = [
	eslintPluginUnicorn.configs["flat/recommended"],
	{
		rules: {
			"unicorn/prevent-abbreviations": [
				"error",
				{
					replacements: {
						props: false,
						ref: false,
					},
				},
			],
		},
	},
];

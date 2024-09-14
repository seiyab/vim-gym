export const languageOptions = {
	languageOptions: {
		parserOptions: {
			projectService: {
				allowDefaultProject: [
					"*.mjs",
					"config/eslint/*.mjs",
					"config/vite/*.js",
					".js",
				],
				defaultProject: "tsconfig.json",
			},
			tsconfigRootDir: `${import.meta.dirname}/../..`,
		},
	},
};

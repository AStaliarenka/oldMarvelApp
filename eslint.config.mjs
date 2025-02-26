import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"


export default [
	{files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
	{languageOptions: { globals: globals.browser }},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		plugins: {
			"react-hooks": pluginReactHooks
		}
	},
	{
		settings: {
			react: {
				version: "detect"
			}
		}
	},
	{
		rules: {
			"quotes": ["error", "double"],
			"indent": ["error", "tab"],
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
			...pluginReactHooks.configs.recommended.rules
		}
	},
];
/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:react/jsx-runtime",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "react-native"],
	rules: {
		indent: "off",
		"linebreak-style": "off",
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/prop-types": "off",
	},
};

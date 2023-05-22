import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const CombinedDefaultColor = {
	...NavigationDefaultTheme.colors,
	primary: "rgb(110, 25, 255)",
	onPrimary: "rgb(255, 255, 255)",
	primaryContainer: "rgb(233, 221, 255)",
	onPrimaryContainer: "rgb(34, 0, 93)",
	secondary: "rgb(98, 91, 113)",
	onSecondary: "rgb(255, 255, 255)",
	secondaryContainer: "rgb(232, 222, 248)",
	onSecondaryContainer: "rgb(30, 25, 43)",
	tertiary: "rgb(71, 85, 182)",
	onTertiary: "rgb(255, 255, 255)",
	tertiaryContainer: "rgb(223, 224, 255)",
	onTertiaryContainer: "rgb(0, 13, 95)",
	error: "rgb(186, 26, 26)",
	onError: "rgb(255, 255, 255)",
	errorContainer: "rgb(255, 218, 214)",
	onErrorContainer: "rgb(65, 0, 2)",
	background: "rgb(255, 255, 255)", // modified
	onBackground: "rgb(28, 27, 30)",
	surface: "rgb(255, 251, 255)",
	onSurface: "rgb(28, 27, 30)",
	surfaceVariant: "rgb(231, 224, 235)",
	onSurfaceVariant: "rgb(73, 69, 78)",
	outline: "rgb(122, 117, 127)",
	outlineVariant: "rgb(202, 196, 207)",
	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	inverseSurface: "rgb(49, 48, 51)",
	inverseOnSurface: "rgb(244, 239, 244)",
	inversePrimary: "rgb(207, 189, 255)",
	elevation: {
		level0: "transparent",
		level1: "rgb(248, 240, 255)",
		level2: "rgb(243, 233, 255)",
		level3: "rgb(239, 226, 255)",
		level4: "rgb(238, 224, 255)",
		level5: "rgb(235, 219, 255)",
	},
	surfaceDisabled: "rgba(28, 27, 30, 0.12)",
	onSurfaceDisabled: "rgba(28, 27, 30, 0.38)",
	backdrop: "rgba(50, 47, 56, 0.4)",
	lightGrey: "#F5F5F5",

	// primary: '#3daccf',
	// secondary: 'purple',
};

export const CombinedDarkColor = {
	...NavigationDarkTheme.colors,
	primary: "rgb(207, 189, 255)",
	onPrimary: "rgb(58, 0, 146)",
	primaryContainer: "rgb(84, 0, 204)",
	onPrimaryContainer: "rgb(233, 221, 255)",
	secondary: "rgb(203, 194, 219)",
	onSecondary: "rgb(51, 45, 65)",
	secondaryContainer: "rgb(74, 68, 88)",
	onSecondaryContainer: "rgb(232, 222, 248)",
	tertiary: "rgb(187, 195, 255)",
	onTertiary: "rgb(17, 34, 134)",
	tertiaryContainer: "rgb(45, 60, 156)",
	onTertiaryContainer: "rgb(223, 224, 255)",
	error: "rgb(255, 180, 171)",
	onError: "rgb(105, 0, 5)",
	errorContainer: "rgb(147, 0, 10)",
	onErrorContainer: "rgb(255, 180, 171)",
	background: "rgb(0, 0, 0)", // modified
	onBackground: "rgb(230, 225, 230)",
	surface: "rgb(28, 27, 30)",
	onSurface: "rgb(230, 225, 230)",
	surfaceVariant: "rgb(73, 69, 78)",
	onSurfaceVariant: "rgb(202, 196, 207)",
	outline: "rgb(148, 143, 153)",
	outlineVariant: "rgb(73, 69, 78)",
	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	inverseSurface: "rgb(230, 225, 230)",
	inverseOnSurface: "rgb(49, 48, 51)",
	inversePrimary: "rgb(110, 25, 255)",
	elevation: {
		level0: "transparent",
		level1: "rgb(37, 35, 41)",
		level2: "rgb(42, 40, 48)",
		level3: "rgb(48, 45, 55)",
		level4: "rgb(50, 46, 57)",
		level5: "rgb(53, 50, 62)",
	},
	surfaceDisabled: "rgba(230, 225, 230, 0.12)",
	onSurfaceDisabled: "rgba(230, 225, 230, 0.38)",
	backdrop: "rgba(50, 47, 56, 0.4)",
	lightGrey: "#F5F5F5",
};

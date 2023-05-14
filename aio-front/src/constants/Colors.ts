import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	Theme,
} from "@react-navigation/native";
import {
	MD3DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	MD3Theme,
} from "react-native-paper";

export const CombinedDefaultColor: MD3Theme["colors"] & Theme["colors"] = {
	...PaperDefaultTheme.colors,
	...NavigationDefaultTheme.colors,
	background: "white",

	// primary: '#3daccf',
	// secondary: 'purple',
};

export const CombinedDarkColor: MD3Theme["colors"] & Theme["colors"] = {
	...PaperDarkTheme.colors,
	...NavigationDarkTheme.colors,
};

import { configureFonts } from "react-native-paper";
import { MD3Typescale } from "react-native-paper/lib/typescript/src/types";

const FONTS = {
	"Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
	"Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
	"Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
	"Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
	"Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
	"Rubik-ExtraBold": require("../../assets/fonts/Rubik-ExtraBold.ttf"),
	"Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
	"Rubik-LightItalic": require("../../assets/fonts/Rubik-LightItalic.ttf"),
	"Rubik-Italic": require("../../assets/fonts/Rubik-Italic.ttf"),
	"Rubik-MediumItalic": require("../../assets/fonts/Rubik-MediumItalic.ttf"),
	"Rubik-SemiBoldItalic": require("../../assets/fonts/Rubik-SemiBoldItalic.ttf"),
	"Rubik-BoldItalic": require("../../assets/fonts/Rubik-BoldItalic.ttf"),
	"Rubik-ExtraBoldItalic": require("../../assets/fonts/Rubik-ExtraBoldItalic.ttf"),
	"Rubik-BlackItalic": require("../../assets/fonts/Rubik-BlackItalic.ttf"),
};

const baseFont = {
	fontFamily: "Rubik-Regular",
} as const;

const baseVariants = configureFonts({ config: baseFont });

// Then, define custom fonts for different variants

const customVariants = {
	// Customize individual base variants:
	// displayMedium: {
	// 	...baseVariants.displayMedium,
	// },
} as const;

// Finally, merge base variants with your custom tokens
// and apply custom fonts to your theme.

export const FONTS_FOR_PAPER = configureFonts({
	config: {
		...baseVariants,
		...customVariants,
	},
});

export default FONTS;

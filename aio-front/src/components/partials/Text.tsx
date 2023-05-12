import { forwardRef, useMemo } from "react";
import {
	Text as RNText,
	TextProps as RNTextProps,
	StyleProp,
	TextStyle,
} from "react-native";
import FONTS from "../../constants/Fonts";

// Define the type for your new font prop
interface TextProps extends RNTextProps {
	fontFamily?: keyof typeof FONTS;
}

const Text = forwardRef<RNText, TextProps>(
	({ fontFamily, style, ...props }, ref) => {
		const _style = useMemo(() => {
			if (fontFamily) {
				return [
					{ fontFamily: FONTS[fontFamily] },
					style,
				] as StyleProp<TextStyle>;
			}
			return style;
		}, [style, fontFamily]);

		return <RNText {...props} style={_style} ref={ref} />;
	}
);

export default Text;

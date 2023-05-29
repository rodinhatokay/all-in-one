import React, {
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
	MD3DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import { CombinedDarkColor, CombinedDefaultColor } from "../constants/Colors";
import { ColorSchemeName, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FONTS_FOR_PAPER } from "../constants/Fonts";

interface ThemeContext {
	theme: DefaultCombinedTheme;
	changeTheme: (mode: ThemeMode) => void;
	isThemeDark: boolean;
	isThemeReady: boolean;
	mode: ThemeMode;
}

export type ThemeMode = "dark" | "light" | "deviceTheme";

const CombinedDefaultTheme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	fonts: FONTS_FOR_PAPER,

	colors: CombinedDefaultColor,
};

const CombinedDarkTheme = {
	...PaperDarkTheme,
	...NavigationDarkTheme,
	fonts: FONTS_FOR_PAPER,
	colors: CombinedDarkColor,
};

export type DefaultCombinedTheme = typeof CombinedDefaultTheme;

export const ThemeContext = React.createContext<ThemeContext>(
	{} as ThemeContext,
);

export const useTheme = () => useContext(ThemeContext);
/**
 * Theme Provider for app
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const colorSchemeDevice = useColorScheme();

	const [isThemeDark, setIsThemeDark] = useState(colorSchemeDevice === "dark");

	const [theme, setTheme] = useState(
		isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme,
	);
	const [isThemeReady, setIsThemeReady] = useState(false);
	const [mode, setMode] = useState<ThemeMode>("deviceTheme");

	const changeTheme = useCallback(
		async (mode: ThemeMode) => {
			setMode(mode);
			if (mode === "deviceTheme") {
				// try setting into color scheme device if provided
				mode = colorSchemeDevice ?? "light";
				// clear storage in device
				await storeColorScheme(null);
			} else {
				// store scheme in device
				await storeColorScheme(mode);
			}
			setIsThemeDark(mode === "dark");
			setTheme(mode === "dark" ? CombinedDarkTheme : CombinedDefaultTheme);
		},
		[setTheme, setIsThemeDark, colorSchemeDevice],
	);

	useEffect(() => {
		const initTheme = async () => {
			try {
				// store color scheme, if not stored it goes by default
				const colorScheme = await getStoredColorScheme();
				// in case doesnt stored any color schema just follow the device
				changeTheme(colorScheme ?? "deviceTheme");
			} catch (e) {
				console.error("error initing theme", e);
			} finally {
				setIsThemeReady(true);
			}
		};
		initTheme();
	}, [changeTheme]);

	useEffect(() => {
		// listener to color scheme device
		// in case device changes theme based on schedule (day/night)
		// need to change also in app
		const onChangeColorSchemeDevice = async () => {
			try {
				const storedColorSheme = await getStoredColorScheme();
				// if user already stored color scheme then return
				// nothing to change
				if (storedColorSheme) return;
				changeTheme("deviceTheme");
			} catch (e) {
				console.error("error on effect to color scheme device", e);
			}
		};
		onChangeColorSchemeDevice();
	}, [colorSchemeDevice, changeTheme]);

	const preferences = React.useMemo(
		() => ({
			changeTheme,
			isThemeDark,
			theme,
			isThemeReady,
			mode,
		}),
		[changeTheme, isThemeDark, theme, isThemeReady],
	);

	return (
		<ThemeContext.Provider value={preferences}>
			{children}
		</ThemeContext.Provider>
	);
};

const KEY_STORE_COLOR_SCHEME = "KEY_STORE_COLOR_SCHEME";

const storeColorScheme = async (colorScheme: ColorSchemeName) => {
	if (colorScheme) {
		await AsyncStorage.setItem(KEY_STORE_COLOR_SCHEME, colorScheme);
		return;
	} else {
		await AsyncStorage.removeItem(KEY_STORE_COLOR_SCHEME);
	}
};

const getStoredColorScheme = async (): Promise<"light" | "dark" | null> => {
	return (await AsyncStorage.getItem(KEY_STORE_COLOR_SCHEME)) as
		| "light"
		| "dark"
		| null;
};

import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
} from "react";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../localization/en";
import he from "../localization/he";
import * as Updates from "expo-updates";
import { TextKeys } from "../localization/types";

const transilations = {
	en: { translations: en },
	he: { translations: he },
};

const i18n = new I18n(transilations);

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = "en";

interface LocalizationContextProps {
	locale: string;
	setLocale: (locale: string) => void;
	t: (scope: TextKeys) => string;
}

export const LocalizationContext = createContext<LocalizationContextProps>(
	{} as LocalizationContextProps
);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [locale, setLocale] = useState<string>(Localization.locale);

	const t = (scope: TextKeys): string => {
		return i18n.t(scope);
	};

	const switchLocale = async (newLocale: string) => {
		i18n.locale = newLocale;
		setLocale(newLocale);
		await AsyncStorage.setItem("locale", newLocale);

		const isRTL =
			newLocale.startsWith("ar") ||
			newLocale.startsWith("he") ||
			newLocale.startsWith("fa");
		if (I18nManager.isRTL !== isRTL) {
			I18nManager.allowRTL(isRTL);
			I18nManager.forceRTL(isRTL);
			Updates.reloadAsync();
		}
	};

	useEffect(() => {
		const loadLocale = async () => {
			const storedLocale = await AsyncStorage.getItem("locale");
			if (storedLocale !== null) {
				switchLocale(storedLocale);
			} else {
				switchLocale(locale);
			}
		};
		loadLocale();
	}, []);

	return (
		<LocalizationContext.Provider
			value={{ locale, setLocale: switchLocale, t }}
		>
			{children}
		</LocalizationContext.Provider>
	);
};

export const useLocalization = () => useContext(LocalizationContext);

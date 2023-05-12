import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import he from "./he";

export type Language = "he" | "en";

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources: {
		en: { translations: en },
		he: { translations: he },
	},
	lng: "en",
	fallbackLng: "en",
	debug: false,
	ns: ["translations"],
	defaultNS: "translations",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

import { IEnTranslations } from "./en";

export type LangaugeTexts = Partial<{ [key in keyof IEnTranslations]: string }>;

export type TextKeys = keyof IEnTranslations;

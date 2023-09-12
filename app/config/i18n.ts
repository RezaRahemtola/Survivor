import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en-US";
import fr from "@/locales/fr-FR";
import es from "@/locales/es-ES";
import zh from "@/locales/zh-CN";
import hi from "@/locales/hi-IN";
import pt from "@/locales/pt-PT";

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources: {
		en: {
			translation: en,
		},
		fr: {
			translation: fr,
		},
		es: {
			translation: es,
		},
		zh: {
			translation: zh,
		},
		hi: {
			translation: hi,
		},
		pt: {
			translation: pt,
		},
	},
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

import { I18n } from "i18n-js";
import { locale } from "expo-localization";

import translations from "@/locales";

const i18n = new I18n(translations, { locale });

export default i18n;

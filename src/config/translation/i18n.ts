import i18n, { ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import { enUS as fnsEn, faIR as fnsFa } from "date-fns/locale";
import type { Locale } from "date-fns/locale";

import translationEn from "@/config/translation/locales/en";
import translationFa from "@/config/translation/locales/fa";

export type SupportLanguages = "en" | "fa"
export type SupportLanguagesObj = {
    direction: "rtl" | "ltr",
    icon: any,
    label: string,
    fnsLocale: Locale
}

export const supportedLanguages: Record<SupportLanguages, SupportLanguagesObj> = {
    en: {
        direction: "ltr",
        icon: "",
        label: "flag.label.english",
        fnsLocale: fnsEn
    },
    fa: {
        direction: "rtl",
        icon: "",
        label: "flag.label.farsi",
        fnsLocale: fnsFa
    },
}

const resources: Record<SupportLanguages, ResourceLanguage> = {
    en: {
        translation: translationEn
    },
    fa: {
        translation: translationFa
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        skipOnVariables: false
    }
});

export default i18n;

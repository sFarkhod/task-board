import { useTranslation } from "react-i18next";

import { SUPPORTED_LANGS } from "@/i18n/config";

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = async (lang: string) => {
    if (!SUPPORTED_LANGS.includes(lang)) {
      return;
    }

    await i18n.changeLanguage(lang);

    localStorage.setItem("lang", lang);
  };

  return {
    currentLanguage,
    changeLanguage,
    languages: SUPPORTED_LANGS,
  };
}

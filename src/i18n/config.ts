export const SUPPORTED_LANGS = ["en", "ru", "uz"];

export const getBrowserLanguage = (): string => {
  const saved = localStorage.getItem("lang");

  if (saved && SUPPORTED_LANGS.includes(saved as any)) {
    return saved;
  }

  const browserLang = navigator.language;

  if (typeof browserLang === "string") {
    const lang = browserLang.split("-")[0];

    if (SUPPORTED_LANGS.includes(lang as any)) {
      return lang;
    }
  }

  return "en";
};
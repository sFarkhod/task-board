import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getBrowserLanguage } from "./config";

import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enTasks from "./locales/en/tasks.json";
import enBlock from "./locales/en/block.json";

import ruCommon from "./locales/ru/common.json";
import ruAuth from "./locales/ru/auth.json";
import ruTasks from "./locales/ru/tasks.json";
import ruBlock from "./locales/ru/block.json";

import uzCommon from "./locales/uz/common.json";
import uzAuth from "./locales/uz/auth.json";
import uzTasks from "./locales/uz/tasks.json";
import uzBlock from "./locales/uz/tasks.json";

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    tasks: enTasks,
    block: enBlock,
  },
  ru: {
    common: ruCommon,
    auth: ruAuth,
    tasks: ruTasks,
    block: ruBlock,
  },
  uz: {
    common: uzCommon,
    auth: uzAuth,
    tasks: uzTasks,
    block: uzBlock,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getBrowserLanguage(),
  fallbackLng: "en",

  ns: ["common", "auth", "tasks", "block"],
  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

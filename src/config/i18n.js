import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en/translation.json";
import translationIT from "../locales/it/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  it: {
    translation: translationIT
  }
};



i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: i18n.language,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
      unescapePrefix: "-"
    },
    fallbackLng: "en",
    debug: false,
    // have a common namespace used around the full app
    //ns: ['translations','index','search'],
    //defaultNS: 'translations',
    saveMissing: false,
    // path to post missing resources
    addPath: "/locales/add/en/{{ns}}",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    // react-i18next options
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default"
    },
    detection: {
      order: ["cookie", "querystring"],
      caches: ["cookie"]
    }
  });

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Local imports
import resourcesPl from "./../../src/lang/resources.pl.json";
import resourcesEn from "./../../src/lang/resources.en.json";
import resourcesEs from "./../../src/lang/resources.es.json";

// Init the i18next module with the resource files
const initI18n = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        pl: {
          translations: { ...resourcesPl },
        },
        en: {
          translations: { ...resourcesEn },
        },
        es: {
          translations: { ...resourcesEs },
        },
      },
      detection: {
        order: [
          "querystring",
          "cookie",
          "localStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
        lookupQuerystring: "lang",
        lookupCookie: "i18next",
        lookupLocalStorage: "i18nextLng",
        caches: ["localStorage", "cookie"],
      },
      fallbackLng: "en",
      debug: false,
      ns: ["translations"],
      defaultNS: "translations",
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initI18n;

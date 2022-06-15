import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const userLocalLang = navigator.language;
const userLocalLangIdx = navigator.languages.indexOf(userLocalLang);

const lng = localStorage.getItem("language")
  ? localStorage.getItem("language")
  : navigator.languages[userLocalLangIdx + 1];

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    debug: false,
    lng,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

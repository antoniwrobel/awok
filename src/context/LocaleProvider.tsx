import { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { LocaleContextType, LocalesType } from "src/types/locale.types";

export const LocaleContext = createContext<LocaleContextType>(null!);

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as LocalesType;

  const [locale, setLocale] = useState<LocalesType>(lang);

  i18n.on("languageChanged", (lng) => {
    const lang = lng as LocalesType;
    setLocale(lang);
  });

  useEffect(() => {}, [locale]);

  const changeLocale = (l: LocalesType) => {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  };

  const value = { locale, setLocale, changeLocale };

  return (
    <LocaleContext.Provider value={value}>
      {children}
      <Helmet
        htmlAttributes={{
          lang: locale,
        }}
      />
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

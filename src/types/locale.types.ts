import { Dispatch, SetStateAction } from "react";

export type LocalesType = "pl" | "en" | "es";

export interface LocaleContextType {
  locale: LocalesType;
  setLocale: Dispatch<SetStateAction<LocalesType>>;
  changeLocale: (locale: LocalesType) => void;
}

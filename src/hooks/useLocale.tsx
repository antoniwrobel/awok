import { useContext } from "react";
import { LocaleContext } from "src/context/LocaleProvider";

export const useLocale = () => useContext(LocaleContext);

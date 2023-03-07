import { Dispatch, SetStateAction } from "react";

export interface ColorThemeContextType {
  primaryColor: string;
  setPrimaryColor: Dispatch<SetStateAction<string>>;
  secondaryColor: string;
  setSecondaryColor: Dispatch<SetStateAction<string>>;
  resetToDefaultColor: () => void;
  hasThemeBeenChanged: boolean;
  defaultValues: {
    defaultPrimaryColor: string;
    defaultSecondaryColor: string;
  };
}

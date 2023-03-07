import { createContext } from "react";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { ColorThemeContextType } from "src/types/color.types";

export const ColorThemeContext = createContext<ColorThemeContextType>(null!);

const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultPrimaryColor = "#3f50b5";
  const defaultSecondaryColor = "#3f51b5";

  const defaultValues = {
    defaultPrimaryColor,
    defaultSecondaryColor,
  };

  const [primaryColor, setPrimaryColor] = useLocalStorage(
    "primaryColor",
    defaultPrimaryColor
  );
  const [secondaryColor, setSecondaryColor] = useLocalStorage(
    "secondaryColor",
    defaultSecondaryColor
  );

  const resetToDefaultColor = () => {
    setPrimaryColor(defaultPrimaryColor);
    setSecondaryColor(defaultSecondaryColor);
  };

  const hasThemeBeenChanged =
    primaryColor !== defaultPrimaryColor ||
    secondaryColor !== defaultSecondaryColor;

  const value = {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    resetToDefaultColor,
    hasThemeBeenChanged,
    defaultValues,
  };

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;

import { useMediaQuery } from "@mui/material";
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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useLocalStorage(
    "mode",
    prefersDarkMode ? "dark" : "light"
  );

  const toggleColorMode = () => {
    const updatedMode = mode === "light" ? "dark" : "light";
    setMode(updatedMode);
  };

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
    mode,
    toggleColorMode,
  };

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider;

import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useThemeColor } from "src/hooks/useThemeColor";
import { handlePrimaryColor } from "src/styles/create-theme";

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { primaryColor, secondaryColor } = useThemeColor();
  const defaultTheme = handlePrimaryColor(primaryColor, secondaryColor);

  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const theme = handlePrimaryColor(primaryColor, secondaryColor);
    setTheme(theme);
  }, [primaryColor, secondaryColor]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

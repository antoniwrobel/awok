import { ReactNode, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

import { useThemeColor } from "src/hooks/useThemeColor";
import { handlePrimaryColor } from "src/styles/create-theme";

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const { primaryColor, secondaryColor, mode } = useThemeColor();
  const defaultTheme = handlePrimaryColor(primaryColor, secondaryColor, mode);

  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const theme = handlePrimaryColor(primaryColor, secondaryColor, mode);
    setTheme(theme);
  }, [primaryColor, secondaryColor, mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

import { createTheme } from "@mui/material";

export const handlePrimaryColor = (
  primaryValue: string,
  secondaryValue: string
) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryValue,
      },
      secondary: {
        main: secondaryValue,
      },
    },
    typography: {
      fontFamily: "Fira Code",
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            "&.Mui-error": {
              marginLeft: "3px",
            },
          },
        },
      },
    },
  });
  return theme;
};

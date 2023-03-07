import { createTheme } from "@mui/material";

export const handlePrimaryColor = (
  primaryValue: string,
  secondaryValue: string,
  mode: "light" | "dark"
) => {
  const theme = createTheme({
    palette: {
      mode: mode,
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
      MuiTypography: {
        variants: [
          {
            props: { color: "#0288d1" },
            style: { "a&": { color: "#0288d1" } },
          },
        ],
      },
    },
  });
  return theme;
};

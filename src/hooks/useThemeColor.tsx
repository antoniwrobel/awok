import { useContext } from "react";
import { ColorThemeContext } from "src/context/ColorThemeProvider";

export const useThemeColor = () => useContext(ColorThemeContext);

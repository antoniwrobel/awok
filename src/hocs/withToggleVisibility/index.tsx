import { Box } from "@mui/material";
import { ComponentType } from "react";
import { useLocalStorage } from "src/hooks/useLocalStorage";

import BlurOnIcon from "@mui/icons-material/BlurOn";
import BlurOffIcon from "@mui/icons-material/BlurOff";

export const withToggleVisibility = (
  Component: ComponentType<{ isVisible: boolean }>,
  elementName: string
) => {
  return () => {
    const [isVisible, setIsVisible] = useLocalStorage(elementName, true);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const ToggleIcon = isVisible ? BlurOffIcon : BlurOnIcon;

    return (
      <Box display="grid" gridTemplateColumns="1fr 0fr">
        <Component isVisible={isVisible} />
        <Box
          sx={{
            padding: "0 10px",
            cursor: "pointer",
          }}
        >
          <ToggleIcon fontSize="medium" onClick={toggleVisibility} sx={{}} />
        </Box>
      </Box>
    );
  };
};

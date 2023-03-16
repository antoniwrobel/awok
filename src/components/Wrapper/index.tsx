import { ReactNode } from "react";
import Box from "@mui/material/Box";

type WrapperPropsType = {
  children: ReactNode;
};

export const Wrapper = (wrapperProps: WrapperPropsType) => {
  const { children } = wrapperProps;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

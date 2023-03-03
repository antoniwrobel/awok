import Box from "@mui/material/Box";
import { ReactNode } from "react";

type WrapperPropsType = {
  children: ReactNode;
};

export const Wrapper = (wrapperProps: WrapperPropsType) => {
  const { children } = wrapperProps;
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f9",
        minHeight: "100vh",
        padding: ["10px", "20px 10px"],
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

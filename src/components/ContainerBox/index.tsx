import { ReactNode } from "react";
import Container from "@mui/material/Container";

const containerSx = {
  border: "1px solid #dedede",
  borderRadius: "4px",
  padding: ["10px", "10px", "20px"],
  marginBottom: ["10px", "20px"],
};

export const ContainerBox = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth={false} sx={containerSx}>
      {children}
    </Container>
  );
};

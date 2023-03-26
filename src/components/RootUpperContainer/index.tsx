import { Box } from "@mui/material";
import { ReactNode } from "react";

type RootUpperContainerPropsType = {
  children: ReactNode;
};

export const RootUpperContainer = (props: RootUpperContainerPropsType) => {
  const { children } = props;
  return <Box>{children}</Box>;
};

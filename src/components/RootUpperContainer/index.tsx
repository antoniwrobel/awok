import { Box } from "@mui/material";

type RootUpperContainerPropsType = {
  children: JSX.Element[];
};

export const RootUpperContainer = (props: RootUpperContainerPropsType) => {
  const { children } = props;
  return <Box>{children}</Box>;
};

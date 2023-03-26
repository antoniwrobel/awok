import { Box } from "@mui/material";
import { ReactNode } from "react";

// TODO: USE USER MAKE IT DYNAMIC AS FEATURERS
const userFeaturesArray = [1, 2, 3];

type FeatureContainerPropsType<P> = P & { children?: ReactNode | null };

export const FeatureContainer = (
  featureContainerProps: FeatureContainerPropsType<{
    featureId: number;
    isLastElement?: boolean;
  }>
) => {
  const { children, featureId, isLastElement } = featureContainerProps;

  const sx = {
    pb: "10px",
    mb: !isLastElement ? "20px" : "0",
    borderBottom: "1px solid",
  };

  if (!userFeaturesArray.includes(featureId)) {
    return null;
  }

  return <Box sx={sx}>{children}</Box>;
};

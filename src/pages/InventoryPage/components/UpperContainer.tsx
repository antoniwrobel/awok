import { Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { FeatureContainer } from "src/components/FeatureContainer";
import { ManageColumnsVisibility } from "src/components/features/ManageColumnsVisibility";
import { RootUpperContainer } from "src/components/RootUpperContainer";

const ScreenshotFeature = () => {
  return <Box>ScreenshotFeature</Box>;
};

const SearchbarFeature = () => {
  return <Box>SearchbarFeature</Box>;
};

const StyledActionButton = (props: { children: ReactNode }) => (
  <Button variant="contained">{props.children}</Button>
);

export const UpperContainer = () => {
  return (
    <RootUpperContainer>
      <FeatureContainer featureId={1}>
        <ManageColumnsVisibility />
      </FeatureContainer>

      <FeatureContainer featureId={2}>
        <ScreenshotFeature />
      </FeatureContainer>

      <FeatureContainer featureId={3}>
        <SearchbarFeature />
      </FeatureContainer>

      <FeatureContainer featureId={1}>
        <Box display="flex" flexDirection={["column", "row", "row"]} gap="20px">
          <StyledActionButton>Dodaj</StyledActionButton>
          <StyledActionButton>Pokaż usunięte</StyledActionButton>
          <StyledActionButton>Pokaż sprzedane</StyledActionButton>
        </Box>
      </FeatureContainer>
    </RootUpperContainer>
  );
};

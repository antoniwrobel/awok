import { Box } from "@mui/material";
import { FeatureContainer } from "src/components/FeatureContainer";
import { RootUpperContainer } from "src/components/RootUpperContainer";

const ToggleColumnsFeature = () => {
  return <Box>ToggleColumnsFeature</Box>;
};

const ScreenshotFeature = () => {
  return <Box>ScreenshotFeature</Box>;
};

const SearchbarFeature = () => {
  return <Box>SearchbarFeature</Box>;
};

export const UpperContainer = () => {
  return (
    <RootUpperContainer>
      <FeatureContainer featureId={1}>
        <ToggleColumnsFeature />
      </FeatureContainer>

      <FeatureContainer featureId={2}>
        <ScreenshotFeature />
      </FeatureContainer>

      <FeatureContainer featureId={3} isLastElement>
        <SearchbarFeature />
      </FeatureContainer>
    </RootUpperContainer>
  );
};

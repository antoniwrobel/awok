import { Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { FeatureContainer } from "src/components/FeatureContainer";
import { ManageColumnsVisibility } from "src/components/features/ManageColumnsVisibility";
import { RootUpperContainer } from "src/components/RootUpperContainer";

// TODO: USE USER MAKE IT DYNAMIC AS FEATURERS
export const userFeaturesArray = [1, 2, 3, 4] as number[];

const ScreenshotFeature = () => {
  return <Box>ScreenshotFeature</Box>;
};

const SearchbarFeature = () => {
  return <Box>SearchbarFeature</Box>;
};

const StyledActionButton = (props: { children: ReactNode }) => (
  <Button variant="contained">{props.children}</Button>
);

const styles = {
  display: "grid",
  gap: [0, 0, "20px"],
  gridTemplateColumns: ["1fr", "1fr", "1fr 1fr"],
};

export const UpperContainer = () => {
  const shouldRenderFeatureBox = userFeaturesArray.length > 0;

  return (
    <RootUpperContainer>
      {shouldRenderFeatureBox ? (
        <>
          <FeatureContainer featureId={1}>
            <ManageColumnsVisibility />
          </FeatureContainer>

          <Box sx={styles}>
            <FeatureContainer featureId={2}>
              <ScreenshotFeature />
            </FeatureContainer>

            <FeatureContainer featureId={3}>
              <SearchbarFeature />
            </FeatureContainer>
          </Box>

          <Box sx={styles}>
            <FeatureContainer featureId={4}>
              <Box
                display="flex"
                flexDirection={["column", "row", "row"]}
                gap="20px"
              >
                <StyledActionButton>Dodaj</StyledActionButton>
                <StyledActionButton>Pokaż usunięte</StyledActionButton>
                <StyledActionButton>Pokaż sprzedane</StyledActionButton>
              </Box>
              <Box />
            </FeatureContainer>
          </Box>
        </>
      ) : (
        <Box>Brak danych</Box>
      )}
    </RootUpperContainer>
  );
};

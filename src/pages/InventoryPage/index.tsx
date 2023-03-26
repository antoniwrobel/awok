import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UpperContainer } from "./components/UpperContainer";

export const InventoryPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <UpperContainer />
    </Box>
  );
};

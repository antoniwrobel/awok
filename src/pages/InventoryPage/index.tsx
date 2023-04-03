import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UpperContainer } from "./components/UpperContainer";
import { Helmet } from "react-helmet";
import { PAGE_TITLE } from "src/consts";

export const InventoryPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Helmet>
        <title>{PAGE_TITLE + "Inventory"}</title>
      </Helmet>
      <UpperContainer />
    </Box>
  );
};

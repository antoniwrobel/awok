import Box from "@mui/material/Box";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { PAGE_TITLE } from "src/consts";

export const AdminPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Helmet>
        <title>{PAGE_TITLE + "Admin"}</title>
      </Helmet>
      <Box>{t("this-is-admin-page")}</Box>
    </Box>
  );
};

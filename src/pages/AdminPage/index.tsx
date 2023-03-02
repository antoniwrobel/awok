import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export const AdminPage = () => {
  const { t } = useTranslation();
  return <Box>{t("this-is-admin-page")}</Box>;
};

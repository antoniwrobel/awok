import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const PublicPage = () => {
  const { t } = useTranslation();
  return <Box>{t("this-is-public")}</Box>;
};

export default PublicPage;

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ProtectedPage = () => {
  const { t } = useTranslation();
  return <Box>{t("this-is-protected")}</Box>;
};

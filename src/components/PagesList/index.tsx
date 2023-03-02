// External imports
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const PagesList = () => {
  const { t } = useTranslation();
  return (
    <Box height="100%">
      <Box display="flex" flexDirection="column">
        <Link to="/">{t("go-to-public")}</Link>
        <Link to="/login">{t("go-to-login")}</Link>
        <Link to="/register">{t("go-to-register")}</Link>
        <Link to="/protected">{t("go-to-protected")}</Link>
        <Link to="/logged-in">{t("go-to-logged-in")}</Link>
        <Link to="/your-account">{t("go-to-your-account")}</Link>
        <Link to="/admin-page">{t("go-to-admin-page")}</Link>
      </Box>
    </Box>
  );
};

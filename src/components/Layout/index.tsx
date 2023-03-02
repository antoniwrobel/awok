// External imports
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

// Local imports
import AuthStatus from "../AuthStatus";

const Layout = () => {
  const { t } = useTranslation();
  return (
    <Box height="100%">
      <AuthStatus />
      <Box display="flex" flexDirection="column" pt={["10px", "20px"]}>
        <Link to="/">{t("go-to-public")}</Link>
        <Link to="/protected">{t("go-to-protected")}</Link>
        <Link to="/register">{t("go-to-register")}</Link>
      </Box>

      <Outlet />
    </Box>
  );
};

export default Layout;

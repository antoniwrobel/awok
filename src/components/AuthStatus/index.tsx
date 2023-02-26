import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthStatus = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isOnLoginPage = pathname.includes("login");

  const handleSignout = async () => {
    try {
      auth.signout(() => navigate("/"));
    } catch (err) {
      const error = err as string;
      throw new Error(error);
    }
  };

  const handleGoToLoginPage = () => navigate("/login");

  if (!auth || !auth.user) {
    return (
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="h6">
          You are not logged in.
        </Typography>
        {!isOnLoginPage && (
          <Button type="button" onClick={handleGoToLoginPage}>
            Login page
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6" component="h6">
        {t("hello")} {auth.user}
      </Typography>

      <Button type="button" onClick={handleSignout}>
        {t("signout")}
      </Button>
    </Box>
  );
};

export default AuthStatus;

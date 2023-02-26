import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLoading } from "../../hooks";

const AuthStatus = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const { user, signout } = useAuth();

  const navigate = useNavigate();
  const isOnLoginPage = pathname.includes("login");

  const handleSignout = () => {
    setIsLoading(true);

    signout(() => {
      setIsLoading(false);
      navigate("/");
    });
  };

  const handleGoToLoginPage = () => navigate("/login");

  if (!user) {
    return (
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" component="h6">
          {t("not-logged-in")}
        </Typography>

        {!isOnLoginPage && (
          <Button
            type="button"
            onClick={handleGoToLoginPage}
            disabled={isLoading}
          >
            {t("login")}
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6" component="h6">
        {t("hello")} {user}!
      </Typography>

      <Button type="button" onClick={handleSignout} disabled={isLoading}>
        {t("signout")}
      </Button>
    </Box>
  );
};

export default AuthStatus;

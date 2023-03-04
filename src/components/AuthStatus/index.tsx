// External imports
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "src/auth/auth-service";

// Local imports
import { useAuth, useLoading } from "../../hooks";

const AuthStatus = () => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useLoading();
  const { signOut } = useAuth();

  const token = getAccessToken();
  const navigate = useNavigate();

  const handleSignout = () => {
    setIsLoading(true);

    signOut(() => {
      setIsLoading(false);
      navigate("/");
    });
  };

  if (!token) {
    return (
      <Box display="flex" justifyContent="space-between" mb={["10px", "20px"]}>
        <Typography variant="h6" component="h6">
          {t("not-logged-in")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Button type="button" onClick={handleSignout} disabled={isLoading}>
        {t("signout")}
      </Button>
    </Box>
  );
};

export default AuthStatus;

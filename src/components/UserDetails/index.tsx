import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";

export const UserDetails = () => {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useUser();
  const { signOut } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(() => {
      navigate("/");
      window.location.reload();
    });
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <ContainerBox>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex">
          {t("hello-user", {
            username: user.username,
            interpolation: { escapeValue: false, prefix: "", suffix: "" },
          })
            .split(user.username)
            .map((part, index) =>
              index > 0 ? (
                <Typography key={index} fontWeight="bold" mx="8px">
                  {user.username}!
                </Typography>
              ) : (
                <Typography key={index}>{part}</Typography>
              )
            )}
        </Box>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ display: { lg: "none", md: "flex" } }}
        >
          {t("signout")}
        </Button>
      </Box>
    </ContainerBox>
  );
};

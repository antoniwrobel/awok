import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
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
        display="grid"
        alignItems="center"
        gridTemplateColumns={["5fr 1fr"]}
      >
        <Box>
          <Trans i18nKey={"hello-user"} values={{ username: user.username }} />
        </Box>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ display: { lg: "none", md: "flex" }, minWidth: "auto" }}
        >
          {t("signout")}
        </Button>
      </Box>
    </ContainerBox>
  );
};

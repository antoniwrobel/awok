import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useUser } from "src/hooks";
import { ContainerBox } from "../ContainerBox";

export const UserDetails = () => {
  const { isLoggedIn, user } = useUser();
  const { t } = useTranslation();

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <ContainerBox>
      <Box>{t("hello-user", { username: user.username })}</Box>
    </ContainerBox>
  );
};

import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useUser } from "src/hooks";

export const LoggedIn = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <Box>
      {t("user-logged-in")} <br />
      {JSON.stringify(user, null, 2)}
    </Box>
  );
};

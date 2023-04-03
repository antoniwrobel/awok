import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { PAGE_TITLE } from "src/consts";

import { useUser } from "src/hooks";

export const LoggedIn = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const successMessage = t("login-success");
    toast.success(successMessage);
  }, [isLoggedIn]);

  return (
    <Box>
      <Helmet>
        <title>{PAGE_TITLE + "Logged in"}</title>
      </Helmet>
      <Box>
        {t("user-logged-in")} <br />
      </Box>
    </Box>
  );
};

import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUser } from "src/hooks";

export const LoggedIn = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    const successMessage = t("login-success");
    toast.success(successMessage);
  }, [user]);

  return (
    <Box>
      {t("user-logged-in")} <br />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          whiteSpace: "break-spaces",
        }}
      >
        {JSON.stringify(user, null, 2)}
      </Box>
    </Box>
  );
};

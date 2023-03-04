import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "src/api/user";
import { useUser } from "src/context/UserProvider";
import { useLoading } from "src/hooks/useLoading";

export const LoggedIn = () => {
  const { t } = useTranslation();
  const {
    userState: { user },
    dispatchUser,
  } = useUser();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const checkUserInfo = async () => {
    const { username } = user;

    if (!username) {
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const payload = await getUserInfo("username", username);
      dispatchUser({ type: "SET_USER", payload });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  return (
    <Box>
      {t("user-logged-in")} <br />
      {JSON.stringify(user, null, 2)}
    </Box>
  );
};

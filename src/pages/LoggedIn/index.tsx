import Box from "@mui/material/Box";
import axios from "axios";
import axiosInstance from "src/auth/axios-config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoading } from "src/hooks";
import { useTranslation } from "react-i18next";

export const LoggedIn = () => {
  const { t } = useTranslation();
  const { setIsLoading } = useLoading();
  const [user, setUser] = useState<any>();

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const userDetailsResponse = await axiosInstance.get("/get-user");
      if (userDetailsResponse.status === 200) {
        setUser(userDetailsResponse.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        console.error(error);
        throw new Error("Other get user details error");
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Box>
      {t("user-logged-in")} <br />
      {JSON.stringify(user, null, 2)}
    </Box>
  );
};

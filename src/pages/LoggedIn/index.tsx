import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "src/auth/axios-config";

export const LoggedIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();

  const getUserDetails = async () => {
    try {
      const userDetailsResponse = await axiosInstance.get("/get-user?id=8");
      setUser(userDetailsResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.detail);
        navigate("/login");
      } else {
        console.error(error);
        throw new Error("Other register user error");
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Box>
      Zostales poprawnie zalogowany <br />
      {JSON.stringify(user, null, 2)}
    </Box>
  );
};

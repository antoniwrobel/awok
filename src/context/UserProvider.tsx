import axios, { AxiosError } from "axios";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import axiosInstance from "src/auth/axios-config";
import { IUserProvider, UserContextType } from "src/types/user.types";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { ErrorDetailResponse } from "src/types/axios.types";
import { useAuth, useLoading } from "src/hooks";
import {
  axiosErrorHandler,
  getAccessToken,
  USER_KEY,
} from "src/auth/auth-service";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: UserContextType["user"]) => undefined,
  verifyToken: async () => false,
  isLoggedIn: false,
  hasBeenChecked: false,
  setIsLoggedIn: () => undefined,
  setHasBeenChecked: () => undefined,
  getSessionAndSetUser: async () => undefined,
  checkIsUserLoggedIn: async () => undefined,
});

export const UserProvider: FC<IUserProvider> = ({ children }) => {
  const [user, setUser] = useLocalStorage(USER_KEY, null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);
  const { signOut } = useAuth();
  const { setIsLoading } = useLoading();

  const getSessionAndSetUser = async () => {
    const parsedUser = JSON.parse(user);

    if (parsedUser) {
      return;
    }

    try {
      const response = await axiosInstance.get<UserContextType["user"]>(
        `get-session`
      );

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const verifyToken = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return false;
    }

    const verifyTokenResponse = await axiosInstance.post(
      `token/verify-token`,
      {
        token: accessToken,
      },
      {
        withCredentials: true,
      }
    );

    return verifyTokenResponse.status === 200;
  };

  const checkIsUserLoggedIn = async () => {
    setIsLoading(true);
    try {
      const isTokenValid = await verifyToken();

      if (!isTokenValid) {
        return;
      }

      try {
        await getSessionAndSetUser();
        setIsLoggedIn(true);
      } catch (error) {
        const handleAxiosError = axiosErrorHandler((err) => {
          const error = err.error as ErrorDetailResponse;
          toast.error(error.response.data.detail);
          signOut();
        });

        if (axios.isAxiosError(error)) {
          handleAxiosError(error as AxiosError);
        }
      }
    } catch (error) {
      // SWALLOW
    } finally {
      setHasBeenChecked(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const userContextProviderValue = useMemo(
    () => ({
      user,
      setUser,
      verifyToken,
      isLoggedIn,
      hasBeenChecked,
      setIsLoggedIn,
      setHasBeenChecked,
      getSessionAndSetUser,
      checkIsUserLoggedIn,
    }),
    [
      user,
      setUser,
      verifyToken,
      isLoggedIn,
      hasBeenChecked,
      setIsLoggedIn,
      setHasBeenChecked,
      getSessionAndSetUser,
      checkIsUserLoggedIn,
    ]
  );

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

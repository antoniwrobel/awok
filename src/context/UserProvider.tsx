import { createContext, FC, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "src/auth/auth-service";
import axiosInstance from "src/auth/axios-config";
import { IUserProvider, UserContextType } from "src/types/user.types";
import { useLocalStorage } from "src/hooks/useLocalStorage";

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
  const [user, setUser] = useLocalStorage("user", null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  const getSessionAndSetUser = async () => {
    const userFromLocalStorage = window.localStorage.getItem("user") || "false";
    const parsedUserFromLocalStorage = JSON.parse(userFromLocalStorage);

    if (parsedUserFromLocalStorage) {
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

    try {
      const verifyTokenResponse = await axiosInstance.get(`token/verify-token`);

      return verifyTokenResponse.status === 200;

      // SWALLOW THE ERROR
    } catch (error) {
      setUser(null);
    }
  };

  const checkIsUserLoggedIn = async () => {
    try {
      const isTokenValid = await verifyToken();

      if (isTokenValid) {
        try {
          await getSessionAndSetUser();
        } catch (error) {
        } finally {
          setIsLoggedIn(true);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setHasBeenChecked(true);
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

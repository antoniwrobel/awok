import { createContext, FC, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getAccessToken, removeTokens } from "src/auth/auth-service";
import axiosInstance from "src/auth/axios-config";
import {
  IUserProvider,
  UserContextType,
  UserTypeKeys,
} from "src/types/user.types";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: UserContextType["user"]) => undefined,
  verifyToken: async () => false,
  isLoggedIn: false,
  hasBeenChecked: false,
  setIsLoggedIn: () => undefined,
  setHasBeenChecked: () => undefined,
});

export const UserProvider: FC<IUserProvider> = ({ children }) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  // const getUserInfo = async <K extends UserTypeKeys>(
  //   key: K,
  //   value: UserContextType["user"][K]
  // ) => {
  //   try {
  //     const response = await axiosInstance.get(`/get-user?${key}=${value}`);
  //     return response.data;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // };

  const verifyToken = async (): Promise<Boolean> => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return false;
    }

    try {
      const verifyTokenResponse = await axiosInstance.post(
        `token/verify-token`,
        { token: accessToken }
      );

      if (verifyTokenResponse.status === 200) {
        return true;
      } else {
        return false;
      }

      // SWALLOW THE ERROR
    } catch (error) {
      return false;
    }
  };

  const checkIsUserLoggedIn = async () => {
    try {
      const isTokenValid = await verifyToken();

      if (isTokenValid) {
        // setUser(user);
        setIsLoggedIn(true);
      }
    } catch (error) {
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
    }),
    [
      user,
      setUser,
      verifyToken,
      isLoggedIn,
      hasBeenChecked,
      setIsLoggedIn,
      setHasBeenChecked,
    ]
  );

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

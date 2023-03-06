import { AxiosResponse } from "axios";
import { createContext, FC, useEffect, useMemo, useState } from "react";

import axiosInstance from "src/auth/axios-config";
import {
  IUserProvider,
  UserContextType,
  UserTypeKeys,
} from "src/types/user.types";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (user: UserContextType["user"]) => undefined,
  getUserSession: async () => undefined,
  isLoggedIn: false,
  hasBeenChecked: false,
});

export const UserProvider: FC<IUserProvider> = ({ children }) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  const getUserInfo = async <K extends UserTypeKeys>(
    key: K,
    value: UserContextType["user"][K]
  ) => {
    try {
      const response = await axiosInstance.get(`/get-user?${key}=${value}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getUserSession = async (): Promise<
    UserContextType["user"] | undefined
  > => {
    try {
      const getUserSessionResponse = (await axiosInstance.get(
        `/get-session`
      )) as AxiosResponse<UserContextType["user"]>;
      const responseType = typeof getUserSessionResponse.data;

      if (responseType !== "object") {
        throw new Error(
          `get-session response wrong type. received "${responseType}" instead of "object" type`
        );
      }

      return getUserSessionResponse.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleCheckUser = async () => {
    const user = await getUserSession();

    if (user) {
      setUser(user);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    handleCheckUser();
  }, []);

  const userContextProviderValue = useMemo(
    () => ({
      user,
      setUser,
      getUserSession,
      isLoggedIn,
      hasBeenChecked,
    }),
    [user, setUser, getUserSession, isLoggedIn, hasBeenChecked]
  );

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

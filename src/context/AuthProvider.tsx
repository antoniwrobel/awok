import { createContext } from "react";

import axiosInstance from "src/auth/axios-config";
import { useUser } from "src/hooks";
import {
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from "src/auth/auth-service";
import {
  AuthContextType,
  GetAccessAndRefreshResponse,
} from "../types/auth.types";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getSessionAndSetUser } = useUser();

  const getAccessAndRefresh = async (username: string, password: string) => {
    try {
      const successResponse =
        await axiosInstance.post<GetAccessAndRefreshResponse>(
          "get-token",
          {
            username,
            password,
          },
          { withCredentials: true }
        );

      if (successResponse.status === 200) {
        setAccessToken(successResponse.data.access);
        setRefreshToken(successResponse.data.refresh);
        try {
          await getSessionAndSetUser();
        } catch (error) {
          console.error(error); // TODO: what should we do
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const signOut = async (callback?: VoidFunction) => {
    callback && callback();
    localStorage.removeItem("user");
    removeTokens();

    if (window.location.pathname !== process.env.PUBLIC_URL) {
      window.location.pathname = process.env.PUBLIC_URL;
    }
  };

  const value = { signOut, getAccessAndRefresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

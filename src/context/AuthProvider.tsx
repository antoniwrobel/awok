import { createContext } from "react";
import { removeAccessToken, setAccessToken } from "src/auth/auth-service";
import { AuthContextType } from "../types/auth.types";
import axiosInstance from "src/auth/axios-config";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const signIn = async (username: string, password: string) => {
    try {
      const successResponse = await axiosInstance.post("/api-token-auth", {
        username,
        password,
      });

      if (successResponse.status === 200) {
        setAccessToken(successResponse.data.token);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const signOut = async (callback: VoidFunction) => {
    callback();
    removeAccessToken();
  };

  const value = { signOut, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

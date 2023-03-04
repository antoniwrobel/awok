import { createContext } from "react";

import ax from "src/auth/axios-config";
import { removeAccessToken, setAccessToken } from "src/auth/auth-service";
import { AuthContextType } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const signIn = async (username: string, password: string) => {
    try {
      const successResponse = await ax.post("/api-token-auth", {
        username,
        password,
      });

      if (successResponse.status === 200) {
        setAccessToken(successResponse.data.token);
        return successResponse.data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const signOut = (callback: VoidFunction) => {
    setAccessToken("");
    callback();
    removeAccessToken();
  };

  const value = { signOut, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

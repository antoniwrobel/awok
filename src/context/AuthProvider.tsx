import axios from "axios";
import { createContext } from "react";
import { setAccessToken } from "src/auth/auth-service";

import ax from "src/auth/axios-config";
import { fakeAuthProvider } from "../auth/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContextType } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

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

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    setAccessToken("");
    callback();
  };

  const value = { user, signin, signout, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

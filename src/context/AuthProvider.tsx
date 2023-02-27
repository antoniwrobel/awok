import axios from "axios";
import { createContext } from "react";

import ax from "src/auth/axios-config";
import { fakeAuthProvider } from "../auth/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContextType } from "../types/auth.types";
import { ErrorResponse } from "src/types/axios.types";

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const signIn = async (
    username: string,
    password: string,
    callback?: VoidFunction
  ) => {
    try {
      const successResponse = await ax.post("/api-token-auth", {
        username,
        password,
      });

      if (successResponse.status === 200) {
        return successResponse.data;
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const error = err as ErrorResponse;
        throw new Error(error.response.data?.message);
      } else {
        console.error(err);
        throw new Error("Other axios error");
      }
    }
  };

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout, signIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

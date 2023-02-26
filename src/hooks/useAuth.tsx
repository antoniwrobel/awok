import { createContext, useContext } from "react";
import { AuthContextType } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

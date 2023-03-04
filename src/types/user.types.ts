import { ReactNode } from "react";

type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
} | null;

export type UserTypeKeys = keyof UserType;

export interface UserContextType {
  user: UserType;
  setUser: (user: UserType) => void;
  getUserSession: () => Promise<UserContextType["user"] | undefined>;
  isLoggedIn: boolean;
  hasBeenChecked: boolean;
}

export interface IUserProvider {
  children: ReactNode;
}

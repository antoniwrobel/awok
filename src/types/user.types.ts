import { Dispatch, ReactNode, SetStateAction } from "react";

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
  verifyToken: () => Promise<Boolean | undefined>;
  isLoggedIn: boolean;
  hasBeenChecked: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setHasBeenChecked: Dispatch<SetStateAction<boolean>>;
  getSessionAndSetUser: () => Promise<undefined>;
  checkIsUserLoggedIn: () => Promise<void>;
}

export interface IUserProvider {
  children: ReactNode;
}

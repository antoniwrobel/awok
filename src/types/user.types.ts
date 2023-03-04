import { Dispatch, SetStateAction } from "react";

type Nullable<T> = {
  [K in keyof T]: T[K] | null | undefined;
};

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
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

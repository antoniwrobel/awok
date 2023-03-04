export type Nullable<T> = {
  [K in keyof T]: T[K] | null | undefined;
};

export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};
export type UserTypeKeys = keyof UserType;

export type UserAction =
  | { type: "SET_USER"; payload: UserType }
  | { type: "SET_USERNAME"; payload: UserType["username"] }
  | { type: "TEST" };

export type UserDispatch = (action: UserAction) => void;

export type UserState = { user: Nullable<UserType> };

export type UserProviderProps = { children: React.ReactNode };

type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type UserAction = { type: "setUser" } | { type: "decrement" };
export type UserDispatch = (action: UserAction) => void;
export type UserState = { user: User | null };
export type UserProviderProps = { children: React.ReactNode };

import { createContext, useState } from "react";
import { UserContextType } from "src/types/user.types";

export const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

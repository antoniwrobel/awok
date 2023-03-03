import { createContext, useContext, useReducer } from "react";
import {
  UserAction,
  UserDispatch,
  UserProviderProps,
  UserState,
} from "src/types/user.types";

const UserStateContext =
  createContext<
    { userState: UserState; dispatchUser: UserDispatch } | undefined
  >(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "setUser": {
      console.log({ state });

      return {
        user: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, dispatchUser] = useReducer(userReducer, { user: null });

  // NOTE: *might* need to memoize this value
  // http://kcd.im/optimize-context
  const value = { userState, dispatchUser };

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export { UserProvider, useUser };

import { createContext, useContext, useReducer } from "react";
import {
  UserAction,
  UserDispatch,
  UserProviderProps,
  UserState,
} from "src/types/user.types";

const initialState: UserState = {
  user: {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    username: null,
  },
};

const UserStateContext =
  createContext<
    { userState: UserState; dispatchUser: UserDispatch } | undefined
  >(undefined);

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "SET_USERNAME": {
      return {
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    }

    case "SET_USER": {
      return {
        user: action.payload,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [userState, dispatchUser] = useReducer(userReducer, initialState);
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

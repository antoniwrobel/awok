import { useContext } from "react";
import { UserContext } from "src/context/UserProvider";

export const useUser = () => useContext(UserContext);

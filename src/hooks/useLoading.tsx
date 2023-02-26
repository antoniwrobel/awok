import { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider";

export const useLoading = () => useContext(LoadingContext);

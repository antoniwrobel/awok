import { Dispatch, SetStateAction } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

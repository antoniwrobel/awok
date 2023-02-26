import { createContext, useState } from "react";
import { LoadingContextType } from "../types/loading.types";

export const LoadingContext = createContext<LoadingContextType>(null!);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = { isLoading, setIsLoading };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;

import axios, { AxiosError } from "axios";
import { IAxiosError, IStockError } from "src/types/axios.types";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = (): string | null =>
  window.localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  window.localStorage.getItem(REFRESH_TOKEN_KEY);

export const setAccessToken = (token: string): void => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const setRefreshToken = (token: string): void => {
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeTokens = (): void => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const axiosErrorHandler = <T>(
  callback: (err: IAxiosError<T> | IStockError<T>) => void
) => {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      return callback({
        error: error as AxiosError<T>,
        type: "axios-error",
      });
    } else {
      return callback({
        error: error,
        type: "stock-error",
      });
    }
  };
};

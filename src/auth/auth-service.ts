import axios, { AxiosError } from "axios";
import { IAxiosError, IStockError } from "src/types/axios.types";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const redirectToLogin = (): void => {
  window.location.href = "/login";
};

export const axiosErrorHandler = <T>(
  callback: (err: IAxiosError<T> | IStockError<T>) => void
) => {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      callback({
        error: error,
        type: "axios-error",
      });
    } else {
      callback({
        error: error,
        type: "stock-error",
      });
    }
  };
};

import { AxiosError } from "axios";

export type ErrorResponse = {
  response: {
    data?: {
      message: string;
    };
    status: number;
  };
};

export type AxiosErrorType<T> = AxiosError<T> | Error;

interface IErrorBase<T> {
  error: Error | AxiosError<T>;
  type: "axios-error" | "stock-error";
}

export interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: "axios-error";
}

export interface IStockError<T> extends IErrorBase<T> {
  error: Error;
  type: "stock-error";
}

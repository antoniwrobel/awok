import { AxiosError, HttpStatusCode } from "axios";
import { RegisterFormFieldNamesType } from "src/pages/Register/register-form-fields";

export type ErrorDetailResponse = {
  response: {
    data: {
      detail: string[] | string;
    };
    status: HttpStatusCode;
  };
};

export type ErrorResponse = {
  response: {
    data?: {
      message: string;
    };
    status: HttpStatusCode;
  };
};

export type NotFieldsErrorType = {
  non_field_errors?: string[] | string;
  detail?: string[] | string;
};

export type RegisterResponseError = {
  [key in RegisterFormFieldNamesType]?: string[] | string;
} &
  NotFieldsErrorType;

export type AxiosErrorType<T> = AxiosError<T> | Error;

interface IErrorBase<T> {
  error: Error | AxiosError<T>;
  type: "axios-error" | "stock-error" | "auth-error";
}

export interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: "axios-error" | "auth-error";
}

export interface IStockError<T> extends IErrorBase<T> {
  error: Error;
  type: "stock-error";
}

import { AxiosError } from "axios";
import { RegisterFormFieldNamesType } from "src/pages/Register/register-form-fields";

export type ErrorResponse = {
  response: {
    data?: {
      message: string;
    };
    status: number;
  };
};

type NotFieldsErrorType = {
  response: {
    data: {
      non_field_errors?: string[] | string;
    };
  };
};

export type RegisterResponseError = {
  response: {
    data: {
      [key in RegisterFormFieldNamesType]?: string[] | string;
    };
  };
} & NotFieldsErrorType;

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

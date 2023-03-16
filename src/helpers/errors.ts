import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { RegisterResponseError } from "src/types/axios.types";

export const handleCombineErrors = (errors: string | string[] | undefined) => {
  const errorMessage = typeof errors === "object" ? errors.join(", ") : errors;
  return errorMessage;
};

export const handleNonFieldErrors = (
  error: AxiosError<RegisterResponseError>
) => {
  let err;
  const nonFieldErrors = error.response?.data.non_field_errors;
  if (!nonFieldErrors) {
    err = error.response?.data.detail;
  } else {
    err = nonFieldErrors;
  }

  const errorMessage = handleCombineErrors(err);
  toast.error(errorMessage);
};

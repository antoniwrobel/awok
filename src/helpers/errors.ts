import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { RegisterResponseError } from "src/types/axios.types";

export const handleCombineErrors = (errors: string | string[] | undefined) => {
  const errorMessage = typeof errors === "object" ? errors.join(", ") : errors;
  return errorMessage;
};

export const handleNonFieldErrors = (
  error: AxiosError<RegisterResponseError>
) => {
  if (error.message) {
    toast.error(error.message);
  }

  const errors = error.response?.data.non_field_errors;
  const errorMessage = handleCombineErrors(errors);
  toast.error(errorMessage);
};

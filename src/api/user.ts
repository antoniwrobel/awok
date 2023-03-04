import axiosInstance from "src/auth/axios-config";
import { UserType, UserTypeKeys } from "src/types/user.types";

export const getUserInfo = async <K extends UserTypeKeys>(
  key: K,
  value: UserType[K]
) => {
  try {
    const response = await axiosInstance.get(`/get-user?${key}=${value}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

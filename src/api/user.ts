import axiosInstance from "src/auth/axios-config";
import { UserContextType, UserTypeKeys } from "src/types/user.types";

export const getUserInfo = async <K extends UserTypeKeys>(
  key: K,
  value: UserContextType["user"][K]
) => {
  try {
    const response = await axiosInstance.get(`/get-user?${key}=${value}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserSession = async () => {
  try {
    const response = await axiosInstance.get(`/get-session`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

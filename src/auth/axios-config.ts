import axios, { AxiosInstance } from "axios";
import { AxiosErrorType } from "src/types/axios.types";
import {
  getRefreshToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  axiosErrorHandler,
} from "./auth-service";

const withErrorHandling = <T>(axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    axiosErrorHandler<AxiosErrorType<T>>(async (error) => {
      return Promise.reject(error);
    })
  ),
    axiosInstance.interceptors.response.use(
      (response) => response,
      axiosErrorHandler<AxiosErrorType<T>>(async (error) => {
        if (error.type === "axios-error" && error.error.response) {
          const { status } = error.error.response;

          if (status === 400) {
            return Promise.reject(error.error);
          }

          if (status === 401) {
            return Promise.reject(error.error);
          }

          if (status === 403) {
            // Refresh access token using refresh token
            const refreshToken = getRefreshToken();

            if (refreshToken) {
              try {
                const response = await axios.post("/auth/refresh-token", {
                  refreshToken,
                });
                const { accessToken, refreshToken: newRefreshToken } =
                  response.data;

                setAccessToken(accessToken);
                setRefreshToken(newRefreshToken);

                const originalRequest = error.error.response.config;
                originalRequest.headers.Authorization = `Token ${accessToken}`;
                return axiosInstance.request(originalRequest);
              } catch (error) {
                return Promise.reject(error);
              }
            } else {
              return Promise.reject(error.error);
            }
          }

          console.error("Handle the error response here", error);
          return Promise.reject(error.error);
        } else {
          console.error("Handle other types of errors here", error);
          return Promise.reject("Something went");
        }
      })
    );

  return axiosInstance;
};

const API_BASE_URL = "http://127.0.0.1:8000/";

const axiosInstance = withErrorHandling(
  axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
  })
);

export default axiosInstance;

import axios, { AxiosInstance } from "axios";
import { AxiosErrorType } from "src/types/axios.types";
import {
  getRefreshToken,
  getAccessToken,
  setAccessToken,
  axiosErrorHandler,
  removeTokens,
  removeUser,
} from "./auth-service";

const withErrorHandling = <T>(axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
        if (error.type === "auth-error") {
          removeTokens();
          removeUser();
          if (window.location.pathname !== process.env.PUBLIC_URL) {
            const loginPage =
              process.env.PUBLIC_URL + "/login&token-expired=true"; // TODO: ADD ROUTER MAPPING
            window.location.pathname = loginPage;
          }

          return;
        }

        if (error.type === "axios-error" && error.error.response) {
          const { status } = error.error.response;

          if (status === 400) {
            return Promise.reject(error.error);
          }

          if (status === 401) {
            //@ts-ignore
            if (error.error.response.data.code === "authentication_failed") {
              const refreshToken = getRefreshToken();
              const response = await axiosInstance.post(`token/refresh`, {
                refresh: refreshToken,
              });

              const { access } = response.data;

              setAccessToken(access);
              error.error.response.headers.Authorization = `Bearer ${access}`;
              return axiosInstance.request(error.error.config!);
            }

            return Promise.reject(error.error);
          }

          if (status === 403) {
            return Promise.reject(error.error);
          }

          if (status === 404) {
            return Promise.reject(error.error);
          }

          console.error("Status not handled, ", error.error);
          return Promise.reject(error.error);
        } else if (error.type === "axios-error") {
          return Promise.reject(
            `Sorry, something went wrong... ${error.error.message}`
          );
        } else {
          return Promise.reject(`Stock error occurred: ${error.error.message}`);
        }
      })
    );

  return axiosInstance;
};

const axiosInstance = withErrorHandling(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
  })
);

export default axiosInstance;

import axios, { AxiosError, AxiosInstance } from "axios";
import { AxiosErrorType } from "src/types/axios.types";
import {
  getRefreshToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  redirectToLogin,
  axiosErrorHandler,
} from "./auth-service";

const withErrorHandling = <T>(axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    axiosErrorHandler<AxiosErrorType<T>>((error) => {
      console.error(error);
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

// Add authorization header to axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // Redirect to login page if user is unauthorized
      redirectToLogin();
    }
    if (error.response.status === 403) {
      // Refresh access token using refresh token
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post("/auth/refresh-token", {
            refreshToken,
          });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setAccessToken(accessToken);
          setRefreshToken(newRefreshToken);
          // Re-send original request with new access token

          const originalRequest = error.config;

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance.request(originalRequest);
        } catch (error) {
          redirectToLogin();
          return Promise.reject(error);
        }
      } else {
        redirectToLogin();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

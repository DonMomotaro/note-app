import axios, {
  Axios,
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import useAuth from "./useAuth";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "@/state/authState";
// import { getStorageItem } from "@/services/storageService";
// import { STORAGE_REFRESH_TOKEN_KEY } from "@/constants/storageKey";
// import { END_POINT } from "@/constants/endpoint";

const baseURL = "http://localhost:4000";
const baseAxios = axios.create({
  baseURL,
  headers: {
    Accept: "*",
    "Content-Type": "application/json",
  },
});
const formAxios = axios.create({
  baseURL,
  headers: {
    Accept: "*",
    "Content-Type": "multipart/form-data",
  },
});

const useAxios = () => {
  const accessToken = useRecoilValue(tokenState);

  const _applyInterceptor = useCallback(
    (axios: AxiosInstance) => {
      axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          return config;
        },
        (error: AxiosError) => {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        async (response) => {
          // Any status code that lie within the range of 2xx cause this function to trigger
          return response;
        },
        async (error: AxiosError) => {
          const originalRequest = error.config;
          if (error?.response?.status === 401) {
          }
          return Promise.reject(error);
        }
      );
    },
    [accessToken]
  );

  const getData = async (url: string, params = {}) => {
    try {
      const res = await baseAxios.get(url, {
        params,
      });
      return res.data;
    } catch (error: any) {
      console.error(error);
      return error?.response?.data;
    }
  };

  const mutateData = async (
    url: string,
    data = {},
    method?: "post" | "put" | "delete",
    useFormAxios: boolean = false
  ) => {
    try {
      const res = await (useFormAxios ? formAxios : baseAxios)[
        method || "post"
      ](url, data);
      return res.data;
    } catch (error: any) {
      console.error(error);
      return error?.response?.data;
    }
  };

  useEffect(() => {
    _applyInterceptor(baseAxios);
    _applyInterceptor(formAxios);
  }, [_applyInterceptor]);

  return {
    formAxios,
    baseAxios,
    getData,
    mutateData,
  };
};

export default useAxios;

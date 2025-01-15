/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

const getConfig = (customConfig: AxiosRequestConfig = {}) => ({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  ...customConfig,
});

export const requestGet = async <T>(
  url: string,
  customConfig: AxiosRequestConfig = {}
): Promise<T> => {
  const config = getConfig(customConfig);
  return axios.get(url, config).then((response) => response.data as T);
};

export const requestPost = async <T>(
  url: string,
  payload?: any,
  customConfig: AxiosRequestConfig = {}
): Promise<T> => {
  const config = getConfig(customConfig);
  return axios
    .post(url, payload, config)
    .then((response) => response.data as T);
};

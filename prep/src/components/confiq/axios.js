import axios from "axios";

export default function (options = {}) {
  // axios instance for making requests
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  // request interceptor
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return axiosInstance;
}

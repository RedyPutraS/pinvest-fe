import Axios from "axios";
import { useAuthStore } from "hooks/use-auth-store";
import { AXIOS_TIMEOUT_CLIENT, AXIOS_TIMEOUT_SERVER } from "utils/constants";

export const axios = Axios.create({
  baseURL: "/api",
  timeout:
    typeof window === "undefined" ? AXIOS_TIMEOUT_SERVER : AXIOS_TIMEOUT_CLIENT,
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  const token =
    useAuthStore.getState().user ?? window.localStorage.getItem("TOKEN");
  if (token) {
    // TODO: FIX TYPE
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    if (err && err.response && err.response.status === 419) {
      // fetch csrf-token
      await Axios.get("/api/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      return axios.request(err.config).catch((err) => {
        if (err && err.response && err.response.status === 419) {
          return (window.location.href = "/auth/login");
        }

        return Promise.reject(err);
      });
    }

    return Promise.reject(err);
  }
);

export default axios;

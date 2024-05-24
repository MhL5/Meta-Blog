import axios from "axios";
import { useAuthContext } from "./AuthContext";
import { useRefreshToken } from "./useRefreshToken";
import { useEffect } from "react";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function useAxiosPrivate() {
  const { refresh } = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          console.log(auth?.accessToken || "no access token");
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return { axiosPrivate };
}

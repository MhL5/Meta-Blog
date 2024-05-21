import { axiosApi } from "@/services/axiosApi";
import { Auth, useAuthContext } from "./AuthContext";

export function useRefreshToken() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axiosApi.get<Auth>("/users/refresh");

    setAuth((prev) => {
      if (prev)
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      return null;
    });

    return response.data.accessToken;
  };

  return { refresh };
}

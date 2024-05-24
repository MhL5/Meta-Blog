import { useAuthContext } from "./AuthContext";
import { refreshApi } from "./services/refreshApi";

export function useRefreshToken() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const newAccessToken = await refreshApi();

    setAuth((prev) => {
      return {
        ...prev,
        ...newAccessToken,
      };
    });

    return newAccessToken;
  };

  return { refresh };
}

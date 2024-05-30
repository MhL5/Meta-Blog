import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { logoutApi } from "./services/logoutApi";
import { refreshApi } from "./services/refreshApi";

type AuthContextType = {
  auth: Auth | null;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
  handlePersistLogin: ({ rememberMe }: { rememberMe: boolean }) => void;
  persistLogin: boolean;
  isLoading: boolean;
};
type AuthContextProviderProps = PropsWithChildren;
export type Auth = {
  accessToken: string;
  data: {
    user: {
      _id: string;
      fullName: string;
      bio: string;
      email: string;
      avatar: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const persistLogin = localStorage.getItem("persistLogin") ? true : false;

  const { isLoading } = useQuery({
    queryKey: [`persistLogin`, persistLogin],
    queryFn: async () => {
      // if persistLogin does not exist call the logoutApi to clear browser cookies
      if (!persistLogin) return await logoutApi();

      const newAccessToken = await refreshApi();
      setAuth((prev) => {
        return {
          ...prev,
          ...newAccessToken,
        };
      });
      return newAccessToken;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  function handlePersistLogin({ rememberMe }: { rememberMe: boolean }) {
    rememberMe
      ? localStorage.setItem("persistLogin", "true")
      : localStorage.setItem("persistLogin", "");
  }

  const ctx = {
    handlePersistLogin,
    persistLogin,
    auth,
    setAuth,
    isLoading,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Auth context was called outside of its provider.");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuthContext };
export default AuthContextProvider;

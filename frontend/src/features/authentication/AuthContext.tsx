import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { axiosApi } from "@/services/axiosApi";

type AuthContextType = {
  auth: Auth | null;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
  handlePersistLogin: () => void;
  persistLogin: boolean;
  isLoading: boolean;
};
type AuthContextProviderProps = PropsWithChildren;
export type Auth = {
  accessToken: string;
  user: {
    active: boolean; // todo unwanted
    avatar: string;
    bio: string;
    createdAt: string;
    email: string;
    fullName: string;
    password: string;
    refreshToken: string[]; // todo unwanted
    role: string;
    updatedAt: string;
    __v: number; // todo unwanted
    _id: string;
  };
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const persistLogin = localStorage.getItem("persistLogin") ? true : false;

  const { isLoading } = useQuery({
    queryKey: [`persistLogin`],
    queryFn: async () => {
      try {
        if (!persistLogin) {
          console.log(`logout`);
          await axiosApi.get<Auth>("/users/logout");
          return "logged out";
        }

        console.log(`login`);
        const response = await axiosApi.get<Auth>("/users/refresh");
        setAuth(response.data);
        return response.data;
      } catch (error) {
        await axiosApi.get<Auth>("/users/logout");
        localStorage.removeItem("persistLogin");
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  function handlePersistLogin() {
    localStorage.setItem("persistLogin", "true");
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

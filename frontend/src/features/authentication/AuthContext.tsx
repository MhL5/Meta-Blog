import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  auth: Auth | null;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
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

import { PropsWithChildren, createContext, useContext } from "react";

type AuthContextType = { test: string };
type AuthContextProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | null>(null);

function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ test: "test" }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContextProvider() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Auth context was called outside of its provider.");

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useAuthContextProvider };
export default AuthContextProvider;

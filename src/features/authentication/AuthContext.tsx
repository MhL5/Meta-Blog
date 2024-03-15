import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useGetUser } from "./useGetUser";
import { User } from "@supabase/supabase-js";

// Types
// context types
type AuthContext = {
  state: typeof initialState;
  dispatch: Dispatch<AuthAction>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleLogin: (params: HandleLoginParams) => void;
  isWorking: boolean;
};
type HandleLoginParams = {
  email: string;
  password: string;
};
type AuthProviderProps = PropsWithChildren;
// reducer types
type ReducerFnState = typeof initialState;
export type AuthAction = { type: "user/loggedIn"; payload: User | null };

// Reducer
const initialState: {
  userLoggedIn: boolean;
  userData: User | null;
} = {
  userLoggedIn: false,
  userData: null,
};

function reducerFn(state: ReducerFnState, action: AuthAction): ReducerFnState {
  switch (action.type) {
    case "user/loggedIn":
      return { ...state, userLoggedIn: true, userData: action.payload };
    default:
      return { ...state };
  }
}

// Context
const AuthContext = createContext<AuthContext | null>(null);
// Context Provider
function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducerFn, initialState);
  // TODO: temp
  const [show, setShow] = useState(false);
  const { getUser, isPending } = useGetUser(dispatch);

  const isWorking = isPending;

  function handleLogin({ email, password }: HandleLoginParams) {
    getUser({ email, password });
    setShow(false);
  }

  return (
    <AuthContext.Provider
      value={{ isWorking, handleLogin, show, setShow, state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuthContext custom hook
function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Auth Context was called outside of its provider!😡");

  return context;
}

// Exports
// eslint-disable-next-line react-refresh/only-export-components
export { useAuthContext };
export default AuthProvider;

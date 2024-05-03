import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, type ReactElement } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "../lib/ReactQuery";

import DarkModeProvider from "../features/theme/DarkModeContext";
import AuthProvider from "../features/authentication/AuthContext";

type ProviderProps = PropsWithChildren;

function Providers({ children }: ProviderProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />

      <DarkModeProvider>
        <AuthProvider>{children}</AuthProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default Providers;

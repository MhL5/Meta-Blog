import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import DarkModeProvider from "@/features/theme/DarkModeContext";
import AuthContextProvider from "@/features/authentication/AuthContext";
import PersistLogin from "@/features/authentication/PersistLogin";

type ProviderProps = PropsWithChildren;

const queryClient = new QueryClient();

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DarkModeProvider>
          <PersistLogin>{children}</PersistLogin>
        </DarkModeProvider>
      </AuthContextProvider>

      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

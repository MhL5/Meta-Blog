import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DarkModeProvider from "@/features/theme/DarkModeContext";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "@/features/authentication/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type ProviderProps = PropsWithChildren;

const queryClient = new QueryClient();

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DarkModeProvider>{children}</DarkModeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

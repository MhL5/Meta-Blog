import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DarkModeProvider from "@/features/theme/DarkModeContext";
import { Toaster } from "@/components/ui/toaster";

type ProviderProps = PropsWithChildren;

const queryClient = new QueryClient();

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>{children}</DarkModeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

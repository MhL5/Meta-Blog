import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, type ReactElement } from "react";
import { queryClient } from "../lib/ReactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DarkModeProvider from "../Context/DarkModeContext";

type ProviderProps = PropsWithChildren;

function Providers({ children }: ProviderProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>{children}</DarkModeProvider>
    </QueryClientProvider>
  );
}

export default Providers;

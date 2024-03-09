import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DarkModeProvider from "./Context/DarkModeContext";

import { router } from "./routes/Router";
import { queryClient } from "./lib/ReactQuery";

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;

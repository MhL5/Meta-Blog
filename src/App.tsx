import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";

import Providers from "./providers/Providers";

import { router } from "./routes/Router";

function App(): ReactElement {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;

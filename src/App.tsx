import { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";

import Providers from "./providers/Providers";

function App(): ReactElement {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import Providers from "./providers/Providers";

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

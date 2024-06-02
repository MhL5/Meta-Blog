import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Providers from "./providers/Providers";
import { Suspense } from "react";
import SpinnerFullScreen from "./components/ui/SpinnerFullScreen";

export default function App() {
  return (
    <Providers>
      <Suspense fallback={<SpinnerFullScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </Providers>
  );
}

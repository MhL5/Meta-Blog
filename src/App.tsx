import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Topics from "./pages/Topics";
import Posts from "./pages/Posts";
import Authors from "./pages/Authors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Homepage />} />

      <Route path="authors" element={<Authors />} />
      <Route path="posts" element={<Posts />} />
      <Route path="topics" element={<Topics />} />

      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

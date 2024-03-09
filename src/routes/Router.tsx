import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import Authors from "../pages/Authors";
import Posts from "../pages/Posts";
import Topics from "../pages/Topics";
import Login from "../pages/login";
import SignUp from "../pages/SignUp";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Homepage />} />

      <Route path="authors" element={<Authors />} />
      <Route path="posts" element={<Posts />} />
      <Route path="topics" element={<Topics />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export { router };

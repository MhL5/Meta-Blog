import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ArticlesPage from "@/pages/ArticlesPage";
import AuthorsPage from "@/pages/AuthorsPage";
import ErrorPage from "@/pages/ErrorPage";
import Homepage from "@/pages/Homepage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignUpPage from "@/pages/SignUpPage";
import TagsPage from "@/pages/TagsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={<Homepage />} />

      <Route path="authors" element={<AuthorsPage />} />
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="tags" element={<TagsPage />} />

      <Route path="signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export { router };

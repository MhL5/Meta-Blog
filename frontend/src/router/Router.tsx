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
import Topics from "@/pages/TopicsPage";
import ArticlePage from "@/pages/ArticlePage";
import DashboardPage from "@/pages/DashboardPage";
import TextEditor from "@/features/textEditor/TextEditor";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={<Homepage />} />

      <Route path="/authors" element={<AuthorsPage />} />

      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:id" element={<ArticlePage />} />

      <Route path="/topics" element={<Topics />} />

      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="user" element={<div>user</div>} />
        <Route path="text-editor" element={<TextEditor />} />
      </Route>

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/notfound" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export { router };

/* eslint-disable react-refresh/only-export-components */
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { lazy } from "react";

const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const ArticlesPage = lazy(() => import("@/pages/ArticlesPage"));
const AuthorsPage = lazy(() => import("@/pages/AuthorsPage"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const Homepage = lazy(() => import("@/pages/Homepage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const Topics = lazy(() => import("@/pages/TopicsPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TextEditor = lazy(() => import("@/features/textEditor/TextEditor"));

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

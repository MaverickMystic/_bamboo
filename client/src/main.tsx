import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./Layouts/main";
import Home from "./pages/Home";
import Speech from "./pages/Speech";
import School from "./pages/school";
import About from "./pages/About";
import Course from "./pages/Course";
import Map from "./pages/Map";
import Agency from "./pages/Agency";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Inquiry from "./pages/Inquiry";
import Blog from "./pages/Blog";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        path: "home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/about/speech",
        element: <Speech />,
      },
      {
        path: "/about/schooloverview",
        element: <About />,
      },
      {
        path: "/school",
        element: <School />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/map",
        element: <Map />,
      },
      {
        path: "/agency",
        element: <Agency />,
      },
      {
        path: "/about/inquiry",
        element: <Inquiry />,
      },
      {
        path: "/blog",
        element: <Blog/>,
      },
      {
        path: "/blog/detail",
        element: <Detail/>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

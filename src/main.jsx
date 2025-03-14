import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root/Root";
import Statistics from "./components/Statistics/Statistics";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/AboutUs/AboutUs";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";
import Gadgets from "./Gadgets/Gadgets";
import GadgetDetails from "./Gadgets/GadgetDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        loader: () => fetch("/category.json"),
        children: [
          {
            path: "/",
            element: <Navigate to="/category/All"></Navigate>,
          },
          {
            path: "/category/All",
            element: <Gadgets></Gadgets>,
            loader: () => fetch("/gadgets.json"),
          },
          {
            path: "category/:category",
            element: <Gadgets></Gadgets>,
            loader: () => fetch("/gadgets.json"),
          },
        ],
      },
      {
        path: "/gadgets/:product_id",
        element: <GadgetDetails></GadgetDetails>,
        loader: () => fetch("/gadgets.json"),
      },
      {
        path: "/Statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        loader: () => fetch("/gadgets.json"),
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home || Gadget Heaven</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <RouterProvider router={router} />
  </StrictMode>
);

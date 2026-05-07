import "./i18n";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>,
);

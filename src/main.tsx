import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import Config from "./routes/Config";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "config",
    element: <Config />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

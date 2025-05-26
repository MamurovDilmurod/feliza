import React from "react";

export const routes = [
  {
    path: "/",
    element: React.lazy(() => import("../pages/home/home")),
  },
];

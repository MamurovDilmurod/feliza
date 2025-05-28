import React from "react";

export const routes = [
  {
    path: "/",
    element: React.lazy(() => import("../pages/home/home")),
  },
  {
    path: "/categoryDetail/:id",
    element: React.lazy(() => import("../pages/categoryDetail/categoryDetail")),
  },
];

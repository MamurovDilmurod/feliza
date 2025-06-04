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
  {
    path: "/looks",
    element: React.lazy(() => import("../pages/looks/looks")),
  },
  {
    path: "/looksDetail/:id",
    element: React.lazy(() => import("../pages/looks/looks-detail")),
  },
  {
    path: "/productDetail/:id",
    element: React.lazy(() => import("../pages/ProductDetail/ProductDetail")),
  },
];

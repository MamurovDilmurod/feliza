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
  {
    path: "/searchResult",
    element: React.lazy(() => import("../pages/searchResult/serachResult")),
  },
  {
    path: "/cart",
    element: React.lazy(() => import("../pages/cart/cart")),
  },
  {
    path: "/favorites",
    element: React.lazy(() => import("../pages/favorites/favorites")),
  },
  {
    path: "/profile",
    element: React.lazy(() => import("../pages/profile/profile")),
  },
  {
    path: "/about",
    element: React.lazy(() => import("../pages/FooterPages/AboutPage")),
  },
  {
    path: "/terms",
    element: React.lazy(() => import("../pages/FooterPages/terms-page")),
  },
  {
    path: "/branches",
    element: React.lazy(() => import("../pages/FooterPages/branch-page")),
  },
  // {
  //   path: "/discounts",
  //   element: React.lazy(() => import("../pages/FooterPages/discounts-page")),
  // }
];

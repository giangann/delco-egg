import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/layout/Layout";
import { Home } from "../pages/home/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];

export const appRouters = createBrowserRouter(routes);

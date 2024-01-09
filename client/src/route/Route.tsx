import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout";
import { Home } from "../pages/Home/Home";
import { CreateForm } from "../pages/EggApplication/CreateForm";
import { List } from "../pages/EggApplication/List";
import { DetailForm } from "../pages/EggApplication/DetailForm";
import SCREEN_PATHS from "../shared/constants/screenPaths";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: SCREEN_PATHS.CREATE,
        element: <CreateForm />,
      },
      {
        path: SCREEN_PATHS.LIST,
        element: <List />,
      },
      {
        path: SCREEN_PATHS.DETAIL,
        element: <DetailForm />,
      },
      {
        path: SCREEN_PATHS.ABOUT,
        element: <About />,
      },
      {
        path: SCREEN_PATHS.CONTACT,
        element: <Contact />,
      },
    ],
  },
];

export const appRouters = createBrowserRouter(routes);

import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout/Layout";
import { Home } from "../pages/Home/Home";
import { CreateForm } from "../pages/EggApplication/CreateForm";
import { List } from "../pages/EggApplication/List";
import { DetailForm } from "../pages/EggApplication/DetailForm";
import SCREEN_PATHS from "../shared/constants/screenPaths";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";
import { Login } from "../pages/Login/Login";
import { QuyTrinhCraw } from "../pages/About/craw/QuyTrinhCraw";
import { Header } from "../pages/Layout/Header";

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
  {
    path: SCREEN_PATHS.QUY_TRINH,
    element: (
      <div>
        <Header />
        <QuyTrinhCraw />
      </div>
    ),
  },
  {
    path: SCREEN_PATHS.LOGIN,
    element: <Login />,
  },
];

export const appRouters = createBrowserRouter(routes);

import { RouteObject, createBrowserRouter } from "react-router-dom";
import { About } from "../pages/About/About";
import { ChungNhanAnToan } from "../pages/About/ChungNhanAnToan";
import { QuyTrinhTrung } from "../pages/About/QuyTrinhTrung";
import { Contact } from "../pages/Contact/Contact";
import { CreateForm } from "../pages/EggApplication/CreateForm";
import { DetailForm } from "../pages/EggApplication/DetailForm";
import { List } from "../pages/EggApplication/List";
import { Home } from "../pages/Home/Home";
import { Header } from "../pages/Layout/Header/Header";
import { Layout } from "../pages/Layout/Layout";
import { Login } from "../pages/Login/Login";
import SCREEN_PATHS from "../shared/constants/screenPaths";
import { ProtectedRoute } from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      // @ts-ignore
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
        path: SCREEN_PATHS.CHUNG_NHAN,
        element: <ChungNhanAnToan />,
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
        <QuyTrinhTrung />
      </div>
    ),
  },
  {
    path: SCREEN_PATHS.LOGIN,
    element: <Login />,
  },
];

export const appRouters = createBrowserRouter(routes);

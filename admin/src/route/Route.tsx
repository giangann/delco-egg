import { RouteObject, createBrowserRouter } from "react-router-dom";
import { EggOrderList } from "../pages/EggApplication/EggOrderList";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout/Layout";
import { Login } from "../pages/Login/Login";
import SCREEN_PATHS from "../shared/constants/screenPaths";
import { UpdatePrice } from "../pages/EggManagement/UpdatePrice";
import { UpdateQuantity } from "../pages/EggManagement/UpdateQuantity";
import { UserList } from "../pages/UserManagement/UserList";
import { UserInformation } from "../pages/UserManagement/UserInformation";
import { MyProfile } from "../pages/Setting/MyProfile";
import { EggOrderDetail } from "../pages/EggApplication/EggOrderDetail";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserCreateForm } from "../pages/UserManagement/UserCreateForm";

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
        path: SCREEN_PATHS.APPLICATION.LIST,
        element: <EggOrderList />,
      },
      {
        path: SCREEN_PATHS.APPLICATION.DETAIL,
        element: <EggOrderDetail />,
      },
      {
        path: SCREEN_PATHS.EGG.UPDATE_PRICE,
        element: <UpdatePrice />,
      },
      {
        path: SCREEN_PATHS.EGG.UPDATE_QUANTITY,
        element: <UpdateQuantity />,
      },
      {
        path: SCREEN_PATHS.USER.LIST,
        element: <UserList />,
      },
      {
        path: SCREEN_PATHS.USER.DETAIL,
        element: <UserInformation />,
      },
      {
        path: SCREEN_PATHS.USER.CREATE,
        element: <UserCreateForm />,
      },
      {
        path: SCREEN_PATHS.MY_PROFILE,
        element: <MyProfile />,
      },
    ],
  },
  {
    path: SCREEN_PATHS.LOGIN,
    element: <Login />,
  },
];

export const appRouters = createBrowserRouter(routes);

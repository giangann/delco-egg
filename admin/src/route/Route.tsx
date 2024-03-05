import { RouteObject, createBrowserRouter } from "react-router-dom";
import { EggOrderDetail } from "../pages/EggApplication/EggOrderDetail";
import { EggOrderList } from "../pages/EggApplication/EggOrderList";
import { CreateNewType } from "../pages/EggManagement/CreateNewType";
import { ListType } from "../pages/EggManagement/ListType";
import { UpdatePrice } from "../pages/EggManagement/UpdatePrice";
import { UpdateQuantity } from "../pages/EggManagement/UpdateQuantity";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout/Layout";
import { Login } from "../pages/Login/Login";
import { MyProfile } from "../pages/Setting/MyProfile";
import { UserCreateForm } from "../pages/UserManagement/UserCreateForm";
import { ClientDetail } from "../pages/UserManagement/ClientDetail";
import { UserList } from "../pages/UserManagement/UserList";
import SCREEN_PATHS from "../shared/constants/screenPaths";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserStatistic } from "../pages/Statistic/User/UserStatistic";
import { SLUG } from "../shared/constants/slug";
import { Manage } from "../pages/Management/Manage";
import { EggManage } from "../pages/Management/EggManage";
import { Statistic } from "../pages/Statistic/Statistic";
import { OrderStatistic } from "../pages/Statistic/Order/OrderStatistic";

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
        path: SCREEN_PATHS.EGG.LIST_TYPE,
        element: <ListType />,
      },
      {
        path: SCREEN_PATHS.EGG.CREATE_TYPE,
        element: <CreateNewType />,
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
        element: <ClientDetail />,
      },
      {
        path: SCREEN_PATHS.USER.CREATE,
        element: <UserCreateForm />,
      },
      {
        path: SCREEN_PATHS.MY_PROFILE,
        element: <MyProfile />,
      },

      // QUẢN LÝ
      {
        path: SLUG.MANAGE,
        element: <Manage />,
      },
      {
        path: `${SLUG.MANAGE}/${SLUG.EGG}`,
        element: <EggManage />,
      },

      // THỐNG KÊ
      {
        path: SLUG.STATISTIC,
        element: <Statistic />,
      },
      // {
      //   path: SCREEN_PATHS.STATISTIC.REVENUE,
      //   element: <UserStatistic />,
      // },
      {
        path: SCREEN_PATHS.STATISTIC.APPLICATION,
        element: <OrderStatistic />,
      },
      // {
      //   path: SCREEN_PATHS.STATISTIC.EGG,
      //   element: <UserStatistic />,
      // },
      {
        path: SCREEN_PATHS.STATISTIC.USER,
        element: <UserStatistic />,
      },
    ],
  },
  {
    path: SCREEN_PATHS.LOGIN,
    element: <Login />,
  },
];

export const appRouters = createBrowserRouter(routes);

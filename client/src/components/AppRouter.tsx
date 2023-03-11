import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from '../hooks/redux';
import App from "../App";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ShopContainer from "../pages/shop/ShopContainer";
import Admin from "../pages/admin/Admin";
import Basket from "../pages/basket/Basket";
import Device from "../pages/device/Device";
import ErrorPage from "../pages/errorPage/ErrorPage";

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ADMIN = '/admin',
  BASKET = '/basket',
  DEVICE = '/device/:id',
  SHOP = '/shop',
  ANYPATH = '*'
}
  
const AppRouter = () => {
  
  const { isAuth } = useAppSelector(state => state.authReducer)

  const publicRouter = createBrowserRouter([
    {
      path: RouteNames.HOME,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: RouteNames.SHOP,
          element: <ShopContainer />
        },
        {
          path: RouteNames.LOGIN,
          element: <Login />
        },
        {
          path: RouteNames.REGISTRATION,
          element: <Register />
        },
        {
          path: RouteNames.DEVICE,
          element: <Device />,
        },
      ],
    }
  ]);

  const privateRouter = createBrowserRouter([
    {
      path: RouteNames.HOME,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <ShopContainer />
        },
        {
          path: RouteNames.SHOP,
          element: <ShopContainer />
        },
        {
          path: RouteNames.LOGIN,
          element: <Login />
        },
        {
          path: RouteNames.REGISTRATION,
          element: <Register />
        },
        {
          path: RouteNames.ADMIN,
          element: <Admin />,
        },
        {
          path: RouteNames.BASKET,
          element: <Basket />,
        },
        {
          path: RouteNames.DEVICE,
          element: <Device />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={isAuth ? privateRouter : publicRouter} />
  );
}
 
export default AppRouter;
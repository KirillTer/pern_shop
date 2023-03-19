import { Menu } from "antd";
import Layout, { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logoutUser } from '../store/reducers/auth/ActionCreators'
import { RouteNames } from './AppRouter';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useAppSelector(state => state.authReducer)

  const publicMenuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
    {
      key: "/registration",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.REGISTRATION),
      label: 'Registration'
    },
    {
      key: "/shop",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.SHOP),
      label: 'Shop'
    },
    {
      key: "/device",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.DEVICE),
      label: 'Device',
      disabled: true
    },
  ];

  const privateMenuItems = [
    {
      key: "/login",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.LOGIN),
      label: 'Login'
    },
    {
      key: "/registration",
      'data-testid': "posts-link",
      onClick: () => navigate(RouteNames.REGISTRATION),
      label: 'Registration'
    },
    {
      key: "/shop",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.SHOP),
      label: 'Shop'
    },
    {
      key: "/device",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.DEVICE),
      label: 'Device',
      disabled: true
    },
    {
      key: "/basket",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.BASKET),
      label: 'Basket'
    },
    {
      key: "/admin",
      'data-testid': "users-link",
      onClick: () => navigate(RouteNames.ADMIN),
      label: 'Admin'
    },
    {
      key: "user",
      label: 'User',
      icon: <UserOutlined />,
      children: [
        {
          label: 'Logout',
          key: 'logout',
          onClick: () => {
            dispatch(logoutUser())
            navigate(RouteNames.LOGIN)
          },
        },
      ],
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode="horizontal"
          selectedKeys={(location.pathname !== `/`) ? ['/'+location.pathname.split('/')[1]] : (isAuth ? [RouteNames.SHOP] : [RouteNames.LOGIN])}
          items={isAuth ? privateMenuItems : publicMenuItems}
        />
      </Header>
    </Layout>
  );
}
 
export default Navbar;
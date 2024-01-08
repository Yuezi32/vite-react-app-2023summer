import { createHashRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Account from '@/pages/account';
import BaseLayout from '@/components/basicLayout/BasicLayout.jsx';
import { globalConfig } from '@/config/globalConfig';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from '@ant-design/icons';

// 全局路由
export const globalRouters = createHashRouter([
  // 对精确匹配"/login"，跳转Login页面
  {
    name: 'login',
    path: '/login',
    element: <Login />,
    icon: <AppstoreOutlined />,
  },
  {
    name: 'basicLayout',
    path: '/',
    element: <BaseLayout />,
    icon: <BarChartOutlined />,
    children: [
      {
        name: '工作台',
        path: '/workBench',
        icon: <HomeOutlined />,
        element: <Home />,
      },
      {
        name: 'home',
        path: '/home',
        icon: <BarChartOutlined />,
        children: [
          {
            name: 'home1',
            path: '/home/1',
            element: <Account />,
            icon: <TeamOutlined />,
          },
        ],
      },
      {
        name: 'account',
        path: '/account',
        element: <Account />,
        icon: <CloudOutlined />,
      },
      {
        name: 'account',
        path: '/a',
        element: <Account />,
        icon: <ShopOutlined />,
      },
      {
        // 如果URL没有"#路由"，跳转Home页面
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        // 未匹配，跳转Login页面
        path: '*',
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

// 路由守卫
export function PrivateRoute(props) {
  // 判断localStorage是否有登录用户信息，如果没有则跳转登录页
  return window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) ? props.children : <Navigate to="/login" />;
}

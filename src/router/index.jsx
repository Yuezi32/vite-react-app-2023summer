import { createHashRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Account from '@/pages/account';
import BaseLayout from '@/components/basicLayout/BasicLayout.jsx';
import BudgetApplicationList from '@/pages/pay/budgetApplication/list/Index';

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
        name: '支出管理',
        path: '/pay',
        icon: <BarChartOutlined />,
        children: [
          {
            name: '事前申请',
            path: '/pay/budgetApplication',
            element: <BudgetApplicationList />,
            icon: <TeamOutlined />,
          },
          {
            name: '报销申请',
            path: '/pay/reimburse',
            element: <BudgetApplicationList />,
            icon: <UserOutlined />,
          },
        ],
      },
      {
        name: '人员信息',
        path: '/account',
        element: <Account />,
        icon: <CloudOutlined />,
      },
      {
        name: '系统信息',
        path: '/system',
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

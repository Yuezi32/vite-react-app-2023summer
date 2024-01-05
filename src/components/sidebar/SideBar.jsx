import React, { useEffect } from 'react';
import { globalRouters } from '@/router';
import { Typography, Layout, Menu, theme } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './sidebar.less';

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

function SideBar() {
  const { routes } = globalRouters;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    console.log('routes', routes);
  }, []);
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: colorBgContainer,
      }}>
      <Title style={{ height: 60 }} level={5}>
        h1. Ant Design
      </Title>
      <Menu mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
  );
}

export default SideBar;

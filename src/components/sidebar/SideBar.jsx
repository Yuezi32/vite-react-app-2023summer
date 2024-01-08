import React, { useEffect, useState } from 'react';
import { globalRouters } from '@/router';
import { Typography, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
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
import logo from '@/common/assets/wumusenlin-logo.png';
import './sidebar.less';

const _basicLayoutKey = 'basicLayout';
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
function handleRoute2Menu(route) {
  const { name, path, icon } = route;
  return {
    key: String(path),
    icon,
    label: <Link to={path}>{name}</Link>,
  };
}

function SideBar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { routes } = globalRouters;
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken();
  const basicLayoutRouter = routes.find((r) => r.name === _basicLayoutKey);
  const menuItems = basicLayoutRouter.children.map((route) => {
    const { name, path, icon, children } = route;
    return {
      ...handleRoute2Menu(route),
      children: children?.map(handleRoute2Menu),
    };
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      collapsedWidth={60}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: colorBgContainer,
      }}>
      <Title style={{ display: 'flex', alignItems: 'center', height: 60, justifyContent: 'center', background: colorBgLayout }} level={5}>
        <img src={logo} width={50} />
        senlin
      </Title>
      <Menu mode="vertical" items={menuItems} />
    </Sider>
  );
}

export default SideBar;

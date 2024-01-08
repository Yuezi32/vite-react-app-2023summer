import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/header';
import { PrivateRoute } from '@/router';
import ThemeProvider from '@/components/ConfigProvider/ThemeProvider';
import SideBar from '@/components/sidebar/SideBar';
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import './basicLayout.less';

const { Content, Footer } = Layout;

export const BasicLayoutContext = createContext()

function BasicLayout() {
  const location = useLocation();
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 2000);
  }, [location.pathname]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <PrivateRoute>
      <ThemeProvider>
        <Layout hasSider>
          <SideBar />
          <Layout>
            <Header />
            <Spin spinning={spinning} size="large">
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <BasicLayoutContext.Provider value={{senlin:'adsfasdfasd',setSpinning}}>
                  {/* {spinning ? <div style={{ height: `calc(100vh - 180px)` }} /> : <Outlet />} */}
                  <Outlet />
                </BasicLayoutContext.Provider>
                
              </Content>
            </Spin>

            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </ThemeProvider>
    </PrivateRoute>
  );
}

export default BasicLayout;

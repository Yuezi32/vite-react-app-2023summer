import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/header';
import { PrivateRoute } from '@/router';
import ThemeProvider from '@/components/ConfigProvider/ThemeProvider';
import SideBar from '@/components/sidebar/SideBar';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './basicLayout.less';

const { Content, Footer } = Layout;

function BasicLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <PrivateRoute>
      <ThemeProvider>
        <Layout hasSider>
          <SideBar />
          <Layout style={{ marginLeft: 200 }}>
            <Header />
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Outlet />
              <div
                style={{
                  padding: 24,
                  textAlign: 'center',
                  // background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}>
                <p>long content</p>
                {
                  // indicates very long content
                  Array.from({ length: 100 }, (_, index) => (
                    <React.Fragment key={index}>
                      {index % 20 === 0 && index ? 'more' : '...'}
                      <br />
                    </React.Fragment>
                  ))
                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </ThemeProvider>
    </PrivateRoute>
  );
}

export default BasicLayout;

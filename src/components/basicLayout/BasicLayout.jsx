import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/header';
import { PrivateRoute } from '@/router';
import ThemeProvider from '@/components/ConfigProvider/ThemeProvider';
import SideBar from '@/components/sidebar/SideBar';
import { Breadcrumb, Button, Layout, Menu, Spin, theme } from 'antd';
import './basicLayout.less';
import { useUpdateEffect } from 'ahooks';
import BasePrompt from '@/components/basePrompt/BasePrompt';

const { Content, Footer } = Layout;

export const BasicLayoutContext = createContext();
export const animation = {
  out: () => {
    const dom = document.getElementById('basic-animation-box');
    dom.style.top = '-100%';
    dom.setAttribute('class', 'with-out');
  },
  in: () => {
    console.log('开始 in');
    const dom = document.getElementById('basic-animation-box');
    dom.style.top = '0';
    dom.setAttribute('class', 'with-in');
  },
};
function BasicLayout() {
  const location = useLocation();
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    animation.out();
  }, []);
  useEffect(() => {
    setSpinning(true);
    animation.in();
    setTimeout(() => {
      animation.out();
      setSpinning(false);
    }, 500);
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
            <div id="basic-animation-box" >加载中。。。</div>
            <Header />
            <Spin spinning={spinning} size="large">
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <BasicLayoutContext.Provider value={{ setSpinning }}>
                  <Outlet />
                  <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2023 Created by Ant UED
                  </Footer>
                </BasicLayoutContext.Provider>
              </Content>
            </Spin>
          </Layout>
        </Layout>
        {/* <BasePrompt /> */}
      </ThemeProvider>
    </PrivateRoute>
  );
}

export default BasicLayout;

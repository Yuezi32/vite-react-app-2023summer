import { useState } from 'react';
import { Avatar, Button, Divider, Layout, Space, theme as antdTheme } from 'antd';
// 新加入“太阳”图标
import { MoonOutlined, ThemeOutlined, SunOutlined } from '@/components/extraIcons';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
// 引入Redux
import { useSelector, useDispatch } from 'react-redux';
// 从主题换肤store分库引入setDark方法
import { setDark } from '@/store/slices/theme';
import ThemeModal from '@/components/themeModal';
import { globalConfig } from '@/config/globalConfig';
import './header.less';

const { Header } = Layout;
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
function Index(props) {
  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();
  // 创建路由定位钩子
  const location = useLocation();
  // 创建路由钩子
  const navigate = useNavigate();

  // 定义导航栏
  const menuItems = [
    {
      // 导航显示的名称
      label: 'Home',
      // 导航唯一标识，为便于当前态的显示，与当前路由保持一致
      key: '/home',
      // 导航的前置图标
      icon: <HomeOutlined />,
      // 点击跳转行为
      onClick: () => {
        navigate('/home');
      },
    },
    {
      label: 'Account',
      key: '/account',
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/account');
      },
    },
  ];

  // 获取redux派发钩子
  const dispatch = useDispatch();

  // 获取store中的主题配置
  const theme = useSelector((state) => state.theme);

  // 接收来自父组件的数据
  const { title, info } = props;

  // 如果info存在，则执行info()
  info && info();

  // 是否显示主题色选择对话框
  const [showThemeModal, setShowThemeModal] = useState(false);

  return (
    <Header
      style={{
        padding: 0,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: colorBgContainer,
        height: 60,
        lineHeight: '60px',
        boxShadow: 'rgb(184 184 184 / 30%) 0px 6px 5px',
      }}>
      <div className="header-wrap">
        <div></div>
        <Space>
          {theme.dark ? (
            <Button
              icon={<SunOutlined />}
              shape="circle"
              onClick={() => {
                dispatch(setDark(false));
              }}></Button>
          ) : (
            <Button
              icon={<MoonOutlined />}
              shape="circle"
              onClick={() => {
                dispatch(setDark(true));
              }}></Button>
          )}
          <Divider type="vertical" style={{ height: 24 }} />
          {
            // 当globalConfig配置了主题色，并且数量大于0时，才显示主题色换肤按钮
            globalConfig.customColorPrimarys && globalConfig.customColorPrimarys.length > 0 && (
              <Button
                icon={<ThemeOutlined />}
                shape="circle"
                onClick={() => {
                  setShowThemeModal(true);
                }}></Button>
            )
          }
          <Divider type="vertical" style={{ height: 24 }} />
          <div className="login-user-avatar">
            <Avatar src={url} size="small" />
            <span style={{marginLeft:8}}>张森林</span>
          </div>
        </Space>
      </div>
      {
        // 显示主题色换肤对话框
        showThemeModal && (
          <ThemeModal
            onClose={() => {
              setShowThemeModal(false);
            }}
          />
        )
      }
    </Header>
  );
}

export default Index;

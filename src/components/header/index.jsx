import { useState } from 'react';
import { Avatar, Badge, Button, Divider, Dropdown, Layout, Space, theme as antdTheme } from 'antd';
// 新加入“太阳”图标
import { MoonOutlined, ThemeOutlined, SunOutlined } from '@/components/extraIcons';
import { HomeOutlined, UserOutlined, BellOutlined, UnorderedListOutlined, RedoOutlined, LogoutOutlined } from '@ant-design/icons';
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
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, boxShadow },
  } = antdTheme.useToken();
  const dropDownItems = [
    {
      key: 'person',
      icon: <UserOutlined />,
      label: '个人设置',
    },
    {
      key: 'versionList',
      icon: <UnorderedListOutlined />,
      label: '更新日志',
    },
    {
      key: 'refreshCache',
      icon: <RedoOutlined />,
      label: '更新缓存',
    },
    {
      key: 'loginOut',
      icon: <LogoutOutlined />,
      label: (
        <div
          onClick={() => {
            navigate('/login');
          }}>
          退出登录
        </div>
      ),
    },
  ];
  // 创建路由定位钩子
  const location = useLocation();

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
        // boxShadow,
      }}>
      <div className="header-wrap">
        <div></div>
        <div className="header-right">
          <Button type="text" className="header-right-item">
            <Badge count={5}>
              <BellOutlined style={{ fontSize: '16px' }} title="通知" />
            </Badge>
          </Button>

          <Button
            type="text"
            className="header-right-item"
            onClick={() => {
              if (theme.dark) {
                dispatch(setDark(false));
              } else {
                dispatch(setDark(true));
              }
            }}>
            {theme.dark ? <SunOutlined style={{ fontSize: '16px' }} /> : <MoonOutlined style={{ fontSize: '16px' }} />}
          </Button>
          <Button
            type="text"
            className="header-right-item"
            title="主题色"
            onClick={() => {
              setShowThemeModal(true);
            }}>
            <ThemeOutlined style={{ fontSize: '16px' }} />
          </Button>
          <Divider type="vertical" style={{ height: 24 }} />
          <Dropdown menu={{ items: dropDownItems }} trigger={['click']}>
            <Button type="text" className="header-right-item">
              <div className="login-user-avatar">
                <Avatar src={url} size="small" />
                <span style={{ marginLeft: 8 }}>张森林</span>
              </div>
            </Button>
          </Dropdown>
        </div>
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

import { useState } from 'react';
import { apiReqs } from '@/api';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Col, Row, Carousel, Divider, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import tuzi from './tuzi.png';
import wumu from './wumu.png';
import ThemeProvider from '@/components/ConfigProvider/ThemeProvider';
import LoginFooter from './components/LoginFooter';
import './login.less';

function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    token: { colorPrimaryText, colorPrimaryBg },
  } = theme.useToken();

  // 登录
  const login = async () => {
    setLoginLoading(true);
    await new Promise((r) => {
      setTimeout(() => {
        r();
      }, 1500);
    });
    apiReqs.signIn({
      data: {
        account,
        password,
      },
      success: (res) => {
        console.log(res);
        setLoginLoading(false);
        navigate('/workBench');
      },
      fail: (err) => {
        console.log('err', err);
        // navigate('/home')
        setLoginLoading(false);
      },
    });
    const d = await new Promise((r) => {
      setTimeout(() => {
        r('senlin');
      }, 3000);
    });
    console.log('d', d);
  };

  return (
    <ThemeProvider>
      <div className="P-login">
        <div className="login-box">
          <Card bordered={false} bodyStyle={{ padding: 0, height: '100%' }}>
            <Row>
              <Col span={12} style={{ background: '#ccc' }}>
                <Carousel rootClassName="login-carousel" autoplay>
                  <div className="login-carousel">
                    <img className="login-carousel-img" src={wumu} alt="" />
                  </div>
                  <div className="login-carousel">
                    <img className="login-carousel-img" src={tuzi} alt="" />
                  </div>
                </Carousel>
              </Col>
              <Col span={12}>
                <div className="login-form-box">
                  <h1 style={{ fontSize: '24px' }}>wumusenlin</h1>
                  <Divider />
                  <h2>账密登录</h2>
                  <br />
                  <div className="ipt-con">
                    <Input
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder="账号"
                      value={account}
                      onChange={(e) => {
                        setAccount(e.target.value);
                      }}
                    />
                  </div>
                  <div className="ipt-con">
                    <Input.Password
                      prefix={<LockOutlined />}
                      size="large"
                      placeholder="密码"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="ipt-btn">
                    <Button
                      loading={loginLoading}
                      size="large"
                      type="primary"
                      block={true}
                      onClick={login}>
                      登录
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        <LoginFooter />
      </div>
    </ThemeProvider>
  );
}

export default Login;

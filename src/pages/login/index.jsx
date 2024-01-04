import { useState } from 'react'
import { apiReqs } from '@/api'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Card, Col, Row } from 'antd'
import imgLogo from './logo.png'
import ThemeProvider from '../../components/ConfigProvider/ThemeProvider'
import LoginFooter from './components/LoginFooter'
import './login.less'


function Login() {
    // 创建路由钩子
    const navigate = useNavigate()

    // 组件中自维护的实时数据
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    // 登录
    const login = () => {
        apiReqs.signIn({
            data: {
                account,
                password,
            },
            success: (res) => {
                console.log(res)
                navigate('/home')
            },
        })
    }

    return (
        <ThemeProvider>
            <div className="P-login">

                <div className='login-box'>
                    <Card bordered={false}>
                        <Row>
                            <Col span={12}>

                                <div className="logo">
                                    <img src={imgLogo} alt="" />
                                </div>

                            </Col>
                            <Col span={12}>
                                <div className="ipt-con">
                                    <Input
                                        placeholder="账号"
                                        value={account}
                                        onChange={(e) => {
                                            setAccount(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="ipt-con">
                                    <Input.Password
                                        placeholder="密码"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="ipt-con">
                                    <Button type="primary" block={true} onClick={login}>
                                        登录
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <LoginFooter />
            </div>
        </ThemeProvider>
    )
}

export default Login

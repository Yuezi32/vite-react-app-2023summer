import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import BasePrompt from '@/components/basePrompt/BasePrompt';


function Account() {

    // 创建路由钩子
    const navigate = useNavigate()

    return (
        <div className="P-account">
            <h1>Account Page</h1>
            <div className="ipt-con">
                <Button type="primary" onClick={() => { navigate('/login') }}>返回登录</Button>
            </div>
            <BasePrompt />
        </div>
    )
}

export default Account
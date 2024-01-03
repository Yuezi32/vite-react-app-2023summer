import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import './account.styl'
import ReactRouterPrompt from "react-router-prompt";
function Account() {

    // 创建路由钩子
    const navigate = useNavigate()

    return (
        <div className="P-account">
            <h1>Account Page</h1>
            <div className="ipt-con">
                <Button type="primary" onClick={() => { navigate('/login') }}>返回登录</Button>
            </div>
            <ReactRouterPrompt
                when={true}
            >
                {({ isActive, onConfirm, onCancel }) =>
                    isActive &&
                    <>
                        <Modal visible={isActive} onOk={onConfirm} onCancel={onCancel}>
                            确认离开当前路由吗？
                        </Modal>
                    </>

                }
            </ReactRouterPrompt>
        </div>
    )
}

export default Account
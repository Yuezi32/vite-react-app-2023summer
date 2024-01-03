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
            // beforeConfirm={async () => {
            //     await delayPromise();
            //     await fetch("https://api.zippopotam.us/in/400072")
            //         .then((response) => response.text())
            //         .then((result) => alert("called beforeConfirm " + result))
            //         .catch((error) => console.log("error", error));
            // }}
            // beforeCancel={() => delayPromise()}
            >
                {({ isActive, onConfirm, onCancel }) =>
                    isActive &&
                    <>
                        <Modal visible={isActive} onOk={onConfirm} onCancel={onCancel}>
                            确认退出吗？
                        </Modal>
                    </>

                }
            </ReactRouterPrompt>
        </div>
    )
}

export default Account
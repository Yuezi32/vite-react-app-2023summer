import { globalConfig } from '@/config/globalConfig'


function LoginFooter() {

  return <div className='login-footer'>
    <p>用户协议</p>
    <p>Copyright  2017 内控易出品 V{globalConfig.GLOBAL_VERSION}</p>
  </div>
}

export default LoginFooter
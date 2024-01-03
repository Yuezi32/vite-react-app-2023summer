import { Outlet } from 'react-router-dom'
import Header from '@/components/header'
import { useSelector } from 'react-redux'
import { theme } from 'antd'
import { PrivateRoute } from '@/router'
import './entry.styl'
import ThemeProvider from '../../components/ConfigProvider/ThemeProvider'

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme

function Entry() {
    // 获取store中的主题配置
    const globalTheme = useSelector((state) => state.theme)

    // Ant Design主题变量
    let antdTheme = {
        // 亮色/暗色配置
        algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    }

    // 应用自定义主题色
    if (globalTheme.colorPrimary) {
        antdTheme.token = {
            colorPrimary: globalTheme.colorPrimary,
        }
    }

    return (
        <PrivateRoute>
            <ThemeProvider>
                <div className="M-entry">
                    <Header />
                    <div className="main-container">
                        <Outlet />
                    </div>
                </div>
            </ThemeProvider>
        </PrivateRoute>
    )
}

export default Entry

import { ConfigProvider, theme } from "antd";
import { useSelector } from 'react-redux'

const { darkAlgorithm, defaultAlgorithm } = theme

function ThemeProvider(props) {
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


  return <ConfigProvider theme={antdTheme}>
    {props?.children}
  </ConfigProvider>
}

export default ThemeProvider
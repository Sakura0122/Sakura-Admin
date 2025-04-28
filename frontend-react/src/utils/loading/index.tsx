import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'
import './index.less'

let count = 0

export const showLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDOM.createRoot(loading).render(<Spin tip="加载中..." fullscreen />)
  }
  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) document.body.removeChild(document.getElementById('loading')!)
}

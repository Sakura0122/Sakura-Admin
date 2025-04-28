import { createRoot } from 'react-dom/client'
// @ts-ignore
import 'virtual:svg-icons-register'
import '@ant-design/v5-patch-for-react-19'

import '@/styles/index.less'
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(<App />)

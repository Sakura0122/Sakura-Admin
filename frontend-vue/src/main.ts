import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from '@/App.vue'
import router from '@/router'
import pinia from '@/stores'
import '@/styles/index.css'
import '@/router/permisstion.ts'
import { loadDirectives } from '@/directive'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(loadDirectives)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router

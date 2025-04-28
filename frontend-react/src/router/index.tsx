import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppRoute, asyncRoutes, constantRoute } from '@/router/routes.tsx'
import Layouts from '@/layouts'
import { AuthLoader } from '@/router/AuthLoader.ts'
import Login from '@/views/login'
import Error404 from '@/views/error-page/404.tsx'
import Error403 from '@/views/error-page/403.tsx'
import * as React from 'react'

const routes: AppRoute[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
    meta: {
      hidden: true,
    },
  },
  {
    id: 'root',
    element: <Layouts />,
    loader: AuthLoader,
    children: [...constantRoute, ...asyncRoutes],
  },
  { path: '/login', element: <Login /> },
  { path: '/404', element: <Error404 /> },
  { path: '/403', element: <Error403 /> },
  { path: '*', element: <Navigate to="/404" /> },
]

const router = createBrowserRouter(routes)
export default router

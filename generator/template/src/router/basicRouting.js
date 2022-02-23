/**
 * @Description:
 * @author Guan LinTao
 * @date 8:13 下午
 * 基础路由
 */
import { dynamicRouting } from '@/config/public'
export default [
  {
    path: '/',
    name: '/',
    redirect: dynamicRouting
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/404')
  },
  {
    path: '/exception',
    name: 'exception',
    component: () => import('@/views/403')
  },
  {
    path: '/fault',
    name: 'fault',
    component: () => import('@/views/502')
  }
]

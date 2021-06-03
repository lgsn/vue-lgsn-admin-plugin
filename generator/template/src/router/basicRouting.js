/**
 * @Description:
 * @author Guan LinTao
 * @date 8:13 下午
 * 基础路由
 */
import { defaultRouterPath } from '@/config/public'
export default [
  {
    path: '/',
    name: '/',
    redirect: defaultRouterPath
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

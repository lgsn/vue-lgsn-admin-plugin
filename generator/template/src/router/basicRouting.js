/**
 * @Description:
 * @author Guan LinTao
 * @date 8:13 下午
 * 基础路由
 * 这里路由会直接被 vue-router加载 不需要额外的操作
 * 不需要权限管理
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
    component: () => import('@/views/pmsPage/404')
  },
  {
    path: '/exception',
    name: 'exception',
    component: () => import('@/views/pmsPage/403')
  },
  {
    path: '/fault',
    name: 'fault',
    component: () => import('@/views/pmsPage/502')
  }
]

/**
 * 路由配置
 **/

import Vue from 'vue'
import Router from 'vue-router'

import myOwn from "./myOwn";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/h5',
  routes: [
    ...myOwn
  ]
})

export default router

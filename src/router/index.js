import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../pages/Layout.vue'

export const menuRoutes = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    meta: { title: '控制台', icon: 'dashboard' },
    component: () => import('../pages/dashboard/Index.vue'),
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '用户管理', icon: 'manage_accounts' },
    component: () => import('../pages/user/Index.vue'),
  },
  {
    path: 'music',
    name: 'Music',
    meta: { title: '音乐管理', icon: 'music_note' },
    component: () => import('../pages/music/Index.vue'),
  },
]

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: menuRoutes,
  },
  {
    path: '/login',
    component: () => import('../pages/login/Login.vue'),
  },
  {
    path: '/403',
    component: () => import('../pages/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/404.vue'),
  },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router

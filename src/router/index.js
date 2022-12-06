import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../pages/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'index',
      component: () => import('../pages/index/Index.vue'),
    },
    ],
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

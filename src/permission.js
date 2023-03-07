import { Notify } from 'quasar'
import router from './router'
import store from './store'

const whiteList = [
  '/login',
  '/403',
  '/404',
]

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  const hasToken = store.state.user.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
    else {
      const user = store.state.user.currentUser
      const adminRole = user.roles.find(role => role.name === 'ROLE_ADMIN')
      if (!adminRole) {
        await store.dispatch('user/logout')
        Notify.create({
          type: 'negative',
          message: '没有登录权限！',
          position: 'top',
        })
        next(`/login?redirect=${to.path}`)
      }
    }
    next()
  }
  else {
    if (whiteList.includes(to.path))
      next()
    else
      next(`/login?redirect=${to.path}`)
  }
})

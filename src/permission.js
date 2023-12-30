import router from './router'
import store from './store'
import notify from './utils/notify'

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
    else if (to.path === '/home') {
      next()
    }
    else {
      const user = store.state.user.currentUser
      const adminRole = user.roles.find(role => role.name === 'ROLE_ADMIN')
      if (!adminRole) {
        await store.dispatch('user/logout')
        notify.error('没有登录权限！')
        next(`/login?redirect=${to.path}`)
      }
      else {
        next()
      }
    }
  }
  else {
    if (whiteList.includes(to.path))
      next()
    else
      next(`/login?redirect=${to.path}`)
  }
})

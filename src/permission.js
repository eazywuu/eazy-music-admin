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
    if (to.path === '/login')
      next({ path: '/' })

    else next()
  }
  else {
    if (whiteList.includes(to.path))
      next()

    else
      next(`/login?redirect=${to.path}`)
  }
})

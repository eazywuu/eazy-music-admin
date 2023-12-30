import { createLogger, createStore } from 'vuex'

import user from './modules/user'
import setting from './modules/setting'

const debug = process.env.NODE_ENV !== 'producation'

export default createStore({
  modules: {
    user,
    setting,
  },
  plugins: debug ? [createLogger()] : [],
})

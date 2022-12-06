import { createLogger, createStore } from 'vuex'

import user from './modules/user'

const debug = process.env.NODE_ENV !== 'producation'

export default createStore({
  modules: {
    user,
  },
  plugins: debug ? [createLogger()] : [],
})

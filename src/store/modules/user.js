import { getCurrentUser, getToken, removeToken, setCurrentUser, setToken } from '../../utils/auth'
import { me, search } from '../../api/user'
import { createToken } from '../../api/token'

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser(),
})

const getters = {
  nicknameFirstWord: state => state.currentUser !== null ? state.currentUser.nickname.slice(0, 1) : '',
  token: state => state.token,
}

const actions = {
  // user login && authentication && authorization
  login: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      createToken(username.trim(), password)
        .then((token) => {
          const authorization = token
          commit('SET_TOKEN', authorization)
          setToken(authorization)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  search: ({ page }) => {
    return new Promise((resolve, reject) => {
      search(page)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchCurrentUser: ({ commit }) => {
    return new Promise((resolve, reject) => {
      me()
        .then((currentUser) => {
          commit('SET_CURRENT_USER', currentUser)
          setCurrentUser(currentUser)
          resolve(currentUser)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // user logout
  logout: ({ commit }) => {
    commit('SET_TOKEN', '')
    commit('SET_CURRENT_USER', null)
    removeToken()
  },
}

const mutations = {
  SET_TOKEN: (state, token) => state.token = token,

  SET_CURRENT_USER: (state, currentUser) => state.currentUser = currentUser,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

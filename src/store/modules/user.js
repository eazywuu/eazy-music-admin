import { getToken, removeToken, setToken } from '../../utils/auth'
import { login } from '../../api/user'

const state = () => ({
  token: getToken(),
  username: '',
  nickname: '吴怡哲',
  roles: [],
})

const getters = {
  nicknameFirstWord: state => state.nickname.slice(0, 1),
  token: state => state.token,
}

const actions = {
  // user login
  login: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then((data) => {
        const authorization = data.headers.authorization
        commit('SET_TOKEN', authorization)
        setToken(authorization)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // user logout
  logout: ({ commit }) => {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
  },
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

const state = () => ({
  nickname: 'aa',
  token: '',
  username: '',
  roles: [],
})

const getters = {
  nicknameFirstWord: state => state.slice(0, 1),
}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

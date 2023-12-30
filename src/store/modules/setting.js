import { getSiteSetting } from '../../api/setting'

const state = () => ({
  site: {
    bucket: null,
    region: null,
    storage: null,
  },
})

const getters = {
  bucket: state => state.site.bucket,
  region: state => state.site.region,
  storage: state => state.site.storage,
}

const actions = {
  fetchSiteSetting: ({ commit }) => {
    getSiteSetting().then((siteSitting) => {
      commit('SET_SETTING_FETCHED', siteSitting)
    })
  },
}

const mutations = {
  SET_SETTING_FETCHED: (state, siteSetting) => state.site = siteSetting,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

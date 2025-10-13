import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Admin',
      role: 'administrator'
    },
    loading: false
  },
  getters: {
    userName: state => state.user.name,
    userRole: state => state.user.role,
    isLoading: state => state.loading
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setLoading({ commit }, loading) {
      commit('SET_LOADING', loading)
    }
  },
  modules: {
  }
})
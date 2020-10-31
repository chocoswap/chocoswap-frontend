import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = key => {
  const initState = {
    wallet: {
      name: '',
      installed: false,
      netVersion: '',
      address: '',
    },
  }

  if (key) {
    return initState.key
  }

  return initState
}


const state = getDefaultState()

const store = new Vuex.Store({
  state,
  mutations: {
    'update:wallet'(state, payload) {
      payload = payload ? payload : getDefaultState('wallet')
      state.wallet = { ...state.wallet, ...payload }
    },
  },
  actions: {

  },
  modules: {

  }
})

export default store

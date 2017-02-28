import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource'

import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
Vue.use(vueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.timeout = 10000

export default new Vuex.Store({
  state,
  mutations,
  actions
})

actions.use(Vue)

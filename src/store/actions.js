import * as types from './mutation-type'

export default {
  increment ({commit}, payload) {
    commit(types.INCREMENT, payload)
  }
}

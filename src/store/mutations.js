import * as types from './mutation-type'

export default {
  [types.ADDNUM] (state, payload) {
    state.count += payload.amount
  },
  [types.GETUSERLIST] (state, payload) {
    state.name = payload.name
  },
  [types.USERLOGIN] (state, payload) {
    state.user = payload.user
    state.token = payload.token
  },
  [types.GETCURRENTUSER] (state, payload) {
    state.user = payload.user
    state.token = payload.token
  }
}

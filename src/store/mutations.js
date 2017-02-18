import * as types from './mutation-type'

export default {
  [types.INCREMENT] (state, payload) {
    state.count += payload.amount
  }
}

import * as types from './mutation-type'

export default {
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
  },
  [types.SHOWSLIDE] (state) {
    state.isShowSlide = true
  },
  [types.CLOSESLIDE] (state) {
    state.isShowSlide = false
  },
  [types.GETNICKNAME] (state, user) {
    state.nickname = user.nickname
  },
  /* 绑定学校 */
  [types.INITBINDFORM] (state, code) {
    state.bindSchoolCode = code
  },
  [types.BINDSCHOOL] (state) {
  }
}

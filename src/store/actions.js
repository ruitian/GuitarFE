import * as types from './mutation-type'

let $http
export default {
  use (vue) {
    $http = vue.http
  },
  getUserList ({commit}) {
    return new Promise((resolve, reject) => {
      $http.get('/api/accounts').then(response => {
        commit(types.GETUSERLIST, {name: response.body.data[0].nickname})
      })
    })
  },
  userLogin ({commit}, userData) {
    return new Promise((resolve, reject) => {
      $http.post('/api/account/login', userData).then(response => {
        const result = response.data
        if (!result.data.ret) {
          commit(types.USERLOGIN, {
            user: result.data,
            token: true
          })
          resolve('登录成功')
        } else {
          reject(result.data.msg)
        }
      }, err => {
        reject(err.data.data.msg)
      })
    })
  },
  getCurrentUser ({commit}) {
    return new Promise((resolve, reject) => {
      $http.get('/api/account/user').then(response => {
        const user = response.data
        if (!user.data.ret) {
          commit(types.GETCURRENTUSER, {
            user: user.data,
            token: true
          })
          resolve(user)
        } else {
          reject(user.data.msg)
        }
      }, err => {
        reject(err.data.data.msg)
      })
    })
  }
}

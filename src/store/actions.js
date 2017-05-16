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
  userLogout ({commit}) {
    return new Promise((resolve, reject) => {
      $http.post('/api/account/logout').then(response => {
        const data = response.data.data
        resolve(data)
        commit(types.USERLOGOUT)
      }, error => {
        reject(error.data.data.msg)
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
  },
  getNickname ({commit}, nickname) {
    return new Promise((resolve, reject) => {
      $http.post('/api/account/nickname', nickname).then(response => {
        const nickname = response.data
        if (!nickname.data.ret) {
          commit(types.GETNICKNAME, {
            nickname: nickname.data
          })
          resolve(nickname)
        } else {
          reject(nickname.data.msg)
        }
      }, err => {
        reject(err.data.data.msg)
      })
    })
  },
  // 侧边栏
  showSlide ({commit}) {
    commit(types.SHOWSLIDE)
  },
  closeSlide ({commit}) {
    commit(types.CLOSESLIDE)
  },
  /* 绑定学生信息 */
  initBindForm ({commit}) {
    return new Promise((resolve, reject) => {
      $http.get('/api/crawl').then(response => {
        const code = response.data
        commit(types.INITBINDFORM, code.data.code_img)
        resolve(code)
      }, error => {
        reject(error)
      })
    })
  },
  bindSchool ({commit}, student) {
    return new Promise((resolve, reject) => {
      $http.post('/api/crawl', student).then(response => {
        const data = response.data.data
        if (data.ret === -1) {
          reject(data.msg)
        } else {
          resolve(data.msg)
        }
      }, error => {
        reject(error)
      })
    })
  },
  // 获取学生信息
  getStudentInfo ({commit}, uid) {
    return new Promise((resolve, reject) => {
      $http.post('/api/account/student', uid).then(response => {
        const data = response.data.data
        commit(types.GETSTUDENTINFO, data)
        if (data.ret === -1) {
          reject(data.msg)
        } else {
          resolve(data)
        }
      }, error => {
        reject(error)
      })
    })
  },
  // 更改地址信息
  changeAddress ({commit}, address) {
    commit(types.CHANGEADDRESS, address)
  }
}

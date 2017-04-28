import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
// import MessageBox from 'mint-ui'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var {auth = true} = meta
  var isLogin = Boolean(store.state.token)
  if (auth && !isLogin) {
    store.dispatch('getCurrentUser').then(res => {
      if (store.state.user.is_bind_school) {
        this.a.push('/')
      } else {
        this.a.push('bindSchool')
      }
    }, err => {
      console.log(err)
    })
  }
  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'})
  }
  if (isLogin && (path === '/login' || path === '/register')) {
    return next({path: '/profile'})
  }
  next()
})

export default router

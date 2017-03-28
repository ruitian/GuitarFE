import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var {auth = true} = meta
  var isLogin = Boolean(store.state.token)
  if (auth && !isLogin) {
    store.dispatch('getCurrentUser').then(res => {
      this.a.push('/')
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

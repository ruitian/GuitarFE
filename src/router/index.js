import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var {auth = true} = meta
  var isLogin = Boolean(store.state.token)

  if (auth && !isLogin && path !== '/login') {
    return next({path: '/login'})
  }
  if (isLogin && (path === '/login' || path === '/register')) {
    return next({path: '/profile'})
  }
  next()
})

export default router

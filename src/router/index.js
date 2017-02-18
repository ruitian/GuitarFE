import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from 'components/Hello'
import User from 'components/User'

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})

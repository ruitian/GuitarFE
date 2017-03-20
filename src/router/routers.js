export default [
  {
    path: '/',
    components: {
      meet: resolve => require(['../components/Hello.vue'], resolve)
    }
  },
  {
    path: '/meet',
    components: {
      meet: resolve => require(['../components/Hello.vue'], resolve)
    }
  },
  {
    path: '/profile',
    components: {
      profile: resolve => require(['../components/User.vue'], resolve)
    }
  },
  {
    path: '/login',
    components: {
      login: resolve => require(['../components/Login.vue'], resolve)
    }
  }
]

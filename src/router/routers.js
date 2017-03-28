export default [
  {
    path: '/',
    component: resolve => require(['../pages/index/Index.vue'], resolve)
  },
  {
    path: '/login',
    component: resolve => require(['../pages/user/Login.vue'], resolve)
  }
  // {
  //   path: '/meet',
  //   components: {
  //     meet: resolve => require(['../components/Hello.vue'], resolve)
  //   }
  // },
  // {
  //   path: '/profile',
  //   components: {
  //     profile: resolve => require(['../components/User.vue'], resolve)
  //   }
  // },
  // {
  // {
  //   path: '/bindSchool',
  //   components: {
  //     bindSchool: resolve => require(['../components/BindSchool.vue'], resolve)
  //   }
  // }
]

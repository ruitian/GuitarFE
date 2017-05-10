export default [
  {
    path: '/',
    component: resolve => require(['../pages/meet/Meet.vue'], resolve)
  },
  {
    path: '/login',
    component: resolve => require(['../pages/user/Login.vue'], resolve)
  },
  {
    path: '/meet',
    component: resolve => require(['../pages/meet/Meet.vue'], resolve)
  },
  {
    path: '/square',
    component: resolve => require(['../pages/square/Square.vue'], resolve)
  },
  {
    path: '/message',
    component: resolve => require(['../pages/message/Message.vue'], resolve)
  },
  {
    path: '/profile',
    component: resolve => require(['../pages/user/User.vue'], resolve),
    children: [
      {
        path: 'student',
        component: resolve => require(['../pages/user/Student.vue'], resolve)
      },
      {
        path: 'setting',
        component: resolve => require(['../pages/user/setting/Setting.vue'], resolve),
        children: [
          {
            path: 'about',
            component: resolve => require(['../pages/user/setting/children/About.vue'], resolve)
          }
        ]
      }
    ]
  },
  {
    path: '/bindSchool',
    component: resolve => require(['../pages/user/BindSchool.vue'], resolve)
  }
]

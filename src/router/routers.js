export default [
  {path: '/', component: resolve => require(['../components/Hello.vue'], resolve)},
  {path: '/meet', component: resolve => require(['../components/Hello.vue'], resolve)},
  {path: '/profile', component: resolve => require(['../components/User.vue'], resolve)},
  {path: '/login', component: resolve => require(['../components/Login.vue'], resolve)}
]

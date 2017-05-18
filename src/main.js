// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from 'App'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import ElementUI from 'element-ui'

/* eslint-disable no-new */
Vue.use(Mint)
Vue.use(ElementUI)

Vue.filter('dynamic_img', (value) => {
  return 'static/dynamic_img/' + value[0]
})
Vue.filter('timestampToDate', (timestamp) => {
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate()
  return Y + M + D
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

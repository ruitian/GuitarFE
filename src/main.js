// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Mint from 'mint-ui'

/* eslint-disable no-new */
Vue.use(Mint)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')

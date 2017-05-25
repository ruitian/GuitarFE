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
  return 'static/dynamic_img/' + value
})
Vue.filter('timestampToDate', (timestamp) => {
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate()
  return Y + M + D
})
Vue.filter('setImgClassName', (imgList) => {
  var length = imgList.length
  if (length === 1) {
    return 'dynamic_img_1'
  } else if (length === 2) {
    return 'dynamic_img_2'
  } else if (length === 3) {
    return 'dynamic_img_3'
  } else {
    return 'dynamic_img_4'
  }
})
// 时间戳转译
Vue.filter('timeStampToWord', (timestamp) => {
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - timestamp
  if (diffValue < 0) {
    return
  }
  var monthC = diffValue / month
  var weekC = diffValue / (7 * day)
  var dayC = diffValue / day
  var hourC = diffValue / hour
  var minC = diffValue / minute
  var result = ''
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

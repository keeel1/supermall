import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from "@/components/common/toast"


Vue.config.productionTip = false
// 安装toast插件
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyload)

// 解决移动端300ms延迟
FastClick.attach(document.body)



new Vue({
  router,
  store,
  toast,
  FastClick,
  render: h => h(App),
}).$mount('#app')

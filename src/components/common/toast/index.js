import Toast from "./Toast"

const obj = {}

// 官方解释: 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
//  如果插件是一个函数，它会被作为 install 方法。
//  install 方法调用时，会将 Vue 作为参数传入。
// Vue是install默认执行时传过来的参数
obj.install = function (Vue) {

  // document.body.appendChild(Toast,$el)

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
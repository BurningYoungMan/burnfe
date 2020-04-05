import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import md5 from 'js-md5';

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$md5 = md5;

// 路由拦截
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == "/login") {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("isFirstLogin")
  }
  let user = JSON.parse(sessionStorage.getItem("user"))
  // if (!user && to.path != "/login") {
  //   next({ path: "/login" })
  // } else {
  //   next()
  // }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

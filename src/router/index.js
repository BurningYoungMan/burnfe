import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import err from "../views/err.vue"
import routerContainer from "../views/routerContainer.vue"

import Home from "../views/home/home.vue"
import Vipmanage from "../views/vipmanage/vipmanage.vue"
import Consumption from "../views/consumption/consumption.vue"
import SystemConfig from "../views/systemConfig/systemConfig.vue"

import AddVip from '../views/vipmanage/addVip.vue'

Vue.use(VueRouter)
var login = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
  },
  {
    path: "/err",
    name: "err",
    component: err,
    hidden: true,
  },
  {
    path: "/home",
    name: "首页",
    component: Home,
    hidden: false,
    iconCls: "el-icon-s-home",
  },
  {
    path: "/vipmanage",
    name: "会员管理",
    component: routerContainer,
    hidden: false,
    iconCls: "el-icon-s-marketing",
    children: [
      {
        path: "/vipmanage/addVip",
        name: "会员目录",
        component: AddVip
      },
    ],
  },
  // {
  //   path: "/consumption",
  //   name: "消费管理",
  //   component: Consumption,
  //   hidden: false,
  //   iconCls: "el-icon-s-data",
  // },
  // {
  //   path: "/systemConfig",
  //   name: "系统配置",
  //   component: SystemConfig,
  //   hidden: false,
  //   iconCls: "el-icon-s-data",
  // }
]

// login.concat(routerMap)

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: login,
})

export default router

import axios from "axios"

axios.defaults.crossDomain = true
axios.defaults.withCredentials = true

//设置超时时间300秒
const timeout = 300000

export function get(url, data) {
  if(url.indexOf("?") != -1){
    url = url + "&n="+encodeURIComponent(Math.random())
    }else{
        url = url + "?n="+encodeURIComponent(Math.random())
    }
  return axios.get(process.env.VUE_APP_URL + url, {
    params: data
  })
}

// By default, axios serializes JavaScript objects to JSON
export function post(url, data) {
  return axios({
    url: process.env.VUE_APP_URL + url,
    method: "post",
    data
  })
}

export function deletes(url, data) {
  return axios({
    url: process.env.VUE_APP_URL + url,
    method: "delete",
    data
  })
}

// 测试使用
export function postTest(url, data) {
  return axios({
    url: url,
    method: "post",
    data
  })
}

// By default, axios serializes JavaScript objects to JSON
export function postForm(url, data = {}) {
  if (typeof data != "object") {
    return
  }
  return axios({
    url: process.env.VUE_APP_URL + url,
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    transformRequest: [
      function(data) {
        let ret = ""
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&"
        }
        return ret
      }
    ],
    data
  })
}
// postForm('/a',{a:1,n:2}).then(res=>{console.log(sessionStorage.getItem('token'))})
// By default, axios serializes JavaScript objects to JSON
export function put(url, data) {
  return axios({
    url: process.env.VUE_APP_URL + url,
    method: "put",
    data
  })
}

// 请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     config.headers = Object.assign({}, config.headers, { token: sessionStorage.getItem("token") })
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

// console.log(router)
// 返回状态判断(添加响应拦截器)
// axios.interceptors.response.use(
//   res => {
//     return res
//   },
//   error => {
//     if (error.response.status === 401) {
//       console.log(window)
//       sessionStorage.removeItem("user")
//       location.hash = '/login'
//       // router.replace({
//       //   path: '/login'
//       // })
//     }
//   }
// )

export default axios

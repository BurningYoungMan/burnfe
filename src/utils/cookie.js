export function getCookie(name) {
  var cookie = document.cookie;
  var arr = cookie.split("; ");
  for(var i = 0; i < arr.length; i ++) {
    var arr1 = arr[i].split("=")
    if(arr1[0] == name) {
      return unescape(arr1[1])
    }
  }
  return ""
}

export function setCookie(name, value, num) {
  var val = escape(value)
  var date = new Date()
  date.setDate(date.getDate() + num)
  document.cookie = `${name} = ${val};expires=${date}`
}

export function reCookie(name) {
  setCookie(name, 123, -1)
}
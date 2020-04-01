import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  showLoding: true
})

let loading
function startLoading() {
  loading = Loading.service({
    fullscreen: true,
    text: 'Loading...',
    customClass: 'loading'
  })
}
function endLoading() {
  loading.close()
}

// 合并同一时刻请求，防止多次弹出loading
let needLoadingRequestCount = 0
export function tryShowLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideLoading() {
  if (needLoadingRequestCount <= 0) { return }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (config.showLoding) {
      // tryShowLoading()
    }

    if (store.getters.token) {
      // let each request carry token
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    tryHideLoading()
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    tryHideLoading()

    const res = response.data
    console.log(res)
    if (res.code !== 0 && res.code !== 20000) {
      Message({
        message: res.msg || '请求错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 2000 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('登录已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    tryHideLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

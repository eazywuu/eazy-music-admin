import axios from 'axios'
import store from '../store'
import notify from '../utils/notify'

const baseURL = import.meta.env.VITE_API_HOST
const tokenPrefix = 'Bearer '

const req = axios.create({
  baseURL,
})

const { get, post, put, delete: del } = req

/**
 * 全局 请求 拦截器
 */
req.interceptors.request.use(
  (request) => {
    // do something before request is sent
    if (store.state.user.token)
      request.headers.Authorization = tokenPrefix + store.state.user.token
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * 全局 响应 拦截器
 */
req.interceptors.response.use(
  response => response.data,
  (error) => {
    errorResponseHandler(error.response)
    return Promise.reject(error)
  },
)

function errorResponseHandler(res) {
  if (res.status === '401' && res.status === '403')
    store.dispatch('user/logout').then(() => window.location.reload())

  if (Array.isArray(res.data)) {
    res.data.forEach((item) => {
      notify.error(item.message)
    })
  }
  else {
    notify.error(res.data.message)
  }
}

export { get, post, put, del }

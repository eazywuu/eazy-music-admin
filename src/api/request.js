import axios from 'axios'
import { Notify } from 'quasar'
import store from '../store'

const baseURL = import.meta.env.VITE_API_HOST
const tokenPrefix = 'Bearer '

const req = axios.create({
  baseURL,
})

// request interceptor
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

req.interceptors.response.use(
  response => response.data,
  (error) => {
    store.dispatch('user/logout')
    Notify.create({
      type: 'negative',
      message: error.message,
      position: 'top',
    })
    return Promise.reject(error)
  },
)

const { get, post, put } = req

export { get, post, put }

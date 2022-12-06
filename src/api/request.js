import axios from 'axios'
import store from '../store'

const baseURL = import.meta.env.VITE_API_HOST

const req = axios.create({
  baseURL,
})

// request interceptor
req.interceptors.request.use(
  (request) => {
    // do something before request is sent
    if (store.state.user.token)
      request.headers.Authrization = store.state.user.token
    return request
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  },
)

// req.interceptors.response.use((response) => {
//   console.log('response', response)
// })

const { get, post, put } = req

export { get, post, put }

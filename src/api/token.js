import { post } from './request'

const createToken = (username, password) => post('/tokens', { username, password })

export { createToken }

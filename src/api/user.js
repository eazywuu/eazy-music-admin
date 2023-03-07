import { get, post } from './request'

// const login = (username, password) => post('/login', { username, password })

const search = pageNumber => get('/users', { params: pageNumber })

const me = () => get('/users/me')

const create = user => post('/users', user)

export { search, me, create }

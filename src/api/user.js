import { get } from './request'

// const login = (username, password) => post('/login', { username, password })

const search = paging => get('/users', { params: paging })

const me = username => get('/users/me', { params: username })

export { search, me }

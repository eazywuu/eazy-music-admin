import { get, post, put } from './request'

const search = () => get('./musics')

const create = music => post('./musics', music)

const update = (id, music) => put(`/music/${id}`, music)

const publish = id => post(`musics/publish/${id}`)

const close = id => post(`musics/close/${id}`)

export { create, search, update, publish, close }

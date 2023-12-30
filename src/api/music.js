import { get, post, put } from './request'

const search = searchFilter => get('./musics', { params: searchFilter })

const create = music => post('./musics', music)

const update = (id, music) => put(`/musics/${id}`, music)

const publish = id => post(`musics/${id}/publish`)

const close = id => post(`musics/${id}/close`)

export { search, create, update, publish, close }

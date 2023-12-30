import { get, post, put } from './request'

const search = searchFilter => get('./artists', { params: searchFilter })

const create = artist => post('/artists', artist)

const update = (id, artist) => put(`/artists/${id}`, artist)

export { search, create, update }

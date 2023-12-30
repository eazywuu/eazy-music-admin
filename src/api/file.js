import { post } from './request'

const initUpload = file => post('/files/upload_init', file)
const finishUpload = fileId => post(`/files/${fileId}/upload_finish`)

export { initUpload, finishUpload }

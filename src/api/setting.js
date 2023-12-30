import { get } from './request'

const getSiteSetting = () => get('/settings/site')

export { getSiteSetting }

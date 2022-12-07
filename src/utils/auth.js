import Cookies from 'js-cookie'

const TOKEN_KEY = 'eazy-music'
const getToken = () => Cookies.get(TOKEN_KEY)

const setToken = token => Cookies.set(TOKEN_KEY, token)

const removeToken = () => Cookies.remove(TOKEN_KEY)

export { getToken, setToken, removeToken }

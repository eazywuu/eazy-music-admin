import Cookies from 'js-cookie'

const TOKEN_KEY = 'jwt'

const USER_KEY = 'current-user'

const getToken = () => Cookies.get(TOKEN_KEY)

const setToken = token => Cookies.set(TOKEN_KEY, token)

const removeToken = () => Cookies.remove(TOKEN_KEY)

const getCurrentUser = () => {
  const user = Cookies.get(USER_KEY)
  return user !== undefined ? JSON.parse(user) : null
}

const setCurrentUser = currentUser => Cookies.set(USER_KEY, JSON.stringify(currentUser))

const removeCurrentUser = () => Cookies.remove(USER_KEY)

export { getToken, setToken, removeToken, getCurrentUser, setCurrentUser, removeCurrentUser }

import { httpService } from './http.service'

export const userService = {
  login,
  loginDemo,
  signup,
  logout,
  getCurrentUser,
  getById,
  update,
}

async function login(userCred) {
  try {
    const { user, accessToken } = await httpService.post('auth/login', userCred)
    if (accessToken) {
      _saveAccessToken(accessToken)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function loginDemo() {
  const { user, accessToken } = await httpService.post('/auth/demo')
  if (accessToken) {
      _saveAccessToken(accessToken)
    }
    return user
}

async function signup(userCred) {
  try {
    const { user, accessToken } = await httpService.post('auth/signup', userCred)
    if (accessToken) {
      _saveAccessToken(accessToken)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function getCurrentUser() {
  try {
    const user = await httpService.get('auth/me')
    return user
  }
  catch (err) {
    if (err?.response && err.response?.status === 401) {
      _clearAccessToken()
      return null
    }
    throw err
  } 
}

async function logout() {
  try {
    await httpService.post('auth/logout')
  } catch (err) {
    throw err
  } finally {
    _clearLocalUser()
    _clearAccessToken()
  }
}

async function getById(userId) {
  return await httpService.get(`users/${userId}`)
}

async function update(user) {
  const updatedUser = await httpService.put(`users/${user._id}`, user)
  return updatedUser
}

function _clearLocalUser() {
  sessionStorage.removeItem('loggedInUser')
}

function _saveAccessToken(token) {
  localStorage.setItem('accessToken', token)
}

function _clearAccessToken(){
    return localStorage.removeItem('accessToken')
}


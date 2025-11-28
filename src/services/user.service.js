import { httpService } from './http.service'

export const userService = {
  login,
  signup,
  logout,
  getCurrentUser,
  getLoggedinUser,
  getById,
  update,
}

async function login(userCred) {
    console.log('user service runs')
  try {
    const { user, accessToken } = await httpService.post('auth/login', userCred)
    console.log("🚀 ~ user:", user)
    if (user && accessToken) {
      _saveLocalUser(user)
      _saveAccessToken(accessToken)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function signup(userCred) {
  try {
    const { user, accessToken } = await httpService.post('auth/signup', userCred)
    if (user && accessToken) {
      _saveLocalUser(user)
      _saveAccessToken(accessToken)
    }
    return user
  } catch (err) {
    throw err
  }
}

async function getCurrentUser() {
    const token =_getAccessToken()
    console.log("🚀 ~ token:", token)
    if (!token) return null
    try {
            const user = await httpService.get('auth/me')
            console.log("🚀 ~ user:", user)
            if (user) {
                _saveLocalUser(user)
            }
            return user
        } catch (err) {
            throw err
    }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedInUser') || 'null')
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    _clearLocalUser()
    _clearAccessToken()
  } catch (err) {
    throw err
  }
}

async function getById(userId) {
  return await httpService.get(`users/${userId}`)
}

async function update(user) {
  const updatedUser = await httpService.put(`users/${user._id}`, user)
  if (updatedUser) {
    _saveLocalUser(updatedUser)
  }
  return updatedUser
}


function _saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    createdAt: user.createdAt,
  }
  sessionStorage.setItem('loggedInUser', JSON.stringify(user))
  return user
}

function _clearLocalUser() {
  sessionStorage.removeItem('loggedInUser')
}

function _saveAccessToken(token) {
  localStorage.setItem('accessToken', token)
}

function _getAccessToken() {
  return localStorage.getItem('accessToken')
}

function _clearAccessToken(){
    return localStorage.removeItem('accessToken')
}

export function isAuthenticated() {
  const user = getLoggedinUser()
  const token = _getAccessToken()
  return !!user && !!token
}
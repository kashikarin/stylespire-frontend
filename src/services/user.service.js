import { th } from 'framer-motion/client'
import { httpService } from './http.service'

export const userService = {
  login,
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
    if (err.response && err.response.status === 401) {
      _clearAccessToken()
      throw new Error('Session expired')
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


function _saveLocalUser(user) {
  
  if (!user?._id || !user?.fullname) return

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


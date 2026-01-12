import Axios from 'axios'
import { userService } from './user.service.js'

  const BASE_URL = import.meta.env.PROD ? 
    '/api/' : '//localhost:8000/api/'

  const axios = Axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
  })

// Add token to each request if available
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 TOKEN_EXPIRED errors and try refresh
let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token)
  })
  failedQueue = []
}

axios.interceptors.response.use(
  response => response,
  async err => {
    const originalRequest = err.config

    if (!originalRequest){
      return Promise.reject(err)
    }

    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(err)
    }
        
    const isTokenExpired = 
      err.response?.status === 401 &&
      err.response?.data?.error === "TOKEN_EXPIRED" 

    if (!isTokenExpired || originalRequest._retry) {
      return Promise.reject(err)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
        }).then(token => {
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = "Bearer " + token
            return axios(originalRequest)
          })
    }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await Axios.post(
          BASE_URL + "auth/refresh",
          {},
          { withCredentials: true }
        )
        
        localStorage.setItem("accessToken", data.accessToken)
        axios.defaults.headers.common.Authorization = "Bearer " + data.accessToken
        
        processQueue(null, data.accessToken)
        return axios(originalRequest)

      } catch (refreshError) {
        processQueue(refreshError)
        await userService.logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      
      } finally {
        isRefreshing = false
      }
  }
)

export const httpService = {
  get(endpoint, params) {
    return ajax(endpoint, 'GET', null, { params })
  },

  post(endpoint, data, config) {
    return ajax(endpoint, 'POST', data, config)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  patch(endpoint, data) {
    return ajax(endpoint, 'PATCH', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint, method = 'GET', data = null, config = {}) {
  try{
    const res = await axios({
      url: endpoint,
      method,
      data,
      ...config,
    })
    return res.data
  } catch(err){
    console.error(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    throw err
  } 
}

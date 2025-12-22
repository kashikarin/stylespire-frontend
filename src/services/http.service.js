import Axios from 'axios'

const BASE_URL =
  import.meta.env.PROD ? '/api/' : '//localhost:8000/api/'

  const axios = Axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
  })
  axios.interceptors.request.use(config => {
  
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint, method = 'GET', data = null) {
  const options = {
    url: endpoint,
    method,
    ...(method === 'GET' ? 
      { params: data || {} } :
      { data }
    )
}

  try {
    const res = await axios(options)
    return res.data
  } catch (err) {
    console.error(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data
    )
    console.dir(err)
    throw err
  }
}

import { httpService } from './http.service'

export const authService = {
    refreshAccessToken
}

export async function refreshAccessToken(){
    const { accessToken } = await httpService.post('auth/refresh')
    if (!accessToken) {
        throw new Error('No access token from refresh')
    }
    localStorage.setItem('accessToken', accessToken)
    return accessToken
}
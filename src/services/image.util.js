export function buildImageUrl(path) {
    if (!path) return ''

    if (path.startsWith('http')) return path.replace(/\/$/, '')
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`

    return `${baseUrl}${cleanPath}`
}
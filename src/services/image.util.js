export function normalizeImageSrc(path) {
    if (!path) return ''
    if (path.startsWith('http')) return path 
    return path.startsWith('/') ? path : `/${path}`
}
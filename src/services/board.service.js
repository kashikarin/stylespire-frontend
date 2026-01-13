import { httpService } from "./http.service"

export const boardService = {
    query,
    update,
    remove,
    getEmptyBoard,
    getByUserId,
    loadOrCreateSelectedBoard,
    createEmptyBoard,
    uploadBoardImage
}

async function query() {
    return httpService.get('board')
}

async function update(board) {
    if (!board._id) throw new Error ('Board not found')
    return await httpService.put(`board/${board._id}`, board)
}

async function createEmptyBoard(){
    return await httpService.post('board', getEmptyBoard())
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
}

function getByUserId() {
    return httpService.get('board/active')
}

function getEmptyBoard() {
    return {
        title: null,
        selectedBackground: null,
        items: [],
    }
}

async function loadOrCreateSelectedBoard(currentBoardId){  
    if (currentBoardId) return null 
    const board = await httpService.get('board/active')
    if (board) return board
    return await createEmptyBoard()
}

async function uploadBoardImage(blob){
    const formData = new FormData()
    formData.append('file', blob)

    // 
    const res = await httpService.post('upload/image', formData)
    return res.url
}

export function buildImageUrl(path) {
    if (!path) return ''

    if (path.startsWith('http')) return path.replace(/\/$/, '')
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const cleanPath = path.startsWith('/') ? path : `/${path}`

    return `${baseUrl}${cleanPath}`
}
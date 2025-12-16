import { httpService } from "./http.service"

export const boardService = {
    query,
    save,
    remove,
    getEmptyBoard,
    getById,
    createBoard
}

async function query(filterBoardsBy = {}) {
    return httpService.get(`board`, filterBoardsBy)
}

async function save(board) {
    try {
        if (board._id) {
            return await httpService.put(`board/${board._id}`, board)
        } else {
            return await httpService.post(`board`, board)
        }
    } catch (err) {
        console.error('Cannot save board', err)
        throw err
    }
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

function getEmptyBoard() {
    return {
        title: '',
        selectedBackground: '',
        items: [],
        userId: ''
    }
}

function createBoard(userId, selectedBackground, items = [], title = ''){
    if (!userId) return
    return {
        title,
        selectedBackground,
        items,
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now()  
    }
}
import { httpService } from "./http.service"

export const boardService = {
    query,
    save,
    remove,
    getEmptyBoard,
    getByUserId,
    loadOrCreateSelectedBoard,
    createBoard
}

async function query() {
    return httpService.get('board')
}

async function save(board) {
    console.log("🚀 ~ save ~ board:", board)
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

async function loadOrCreateSelectedBoard(){    
    let boards = await query()
    console.log("🚀 ~ loadOrCreateSelectedBoard ~ boards:", boards)
    
    if (boards.length > 0) {
        boards.sort((a, b) => a.updatedAt-b.updatedAt)
        return boards[0]
    } 

    let newBoard = getEmptyBoard()
    return await save(newBoard)
}

function createBoard(selectedBackground, items = [], title = ''){
    return {
        title,
        selectedBackground,
        items,
        createdAt: Date.now(),
        updatedAt: Date.now()  
    }
}
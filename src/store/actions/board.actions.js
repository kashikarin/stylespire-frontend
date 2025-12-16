import { boardService } from "../../services/board.service";
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, UPDATE_BOARD } from "../reducers/board.reducer";
import { store } from "../store"

export async function loadBoards(filterBoardsBy) {
    const { userId } = filterBoardsBy
    try {
        const boards = await boardService.query({ userId })
        store.dispatch(getCmdLoadBoards(boards))    
    } catch (err) { 
        console.error('Cannot load boards', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)   
        store.dispatch(getCmdLoadBoard(board)) 
    } catch (err) { 
        console.error('Cannot load board', err)
        throw err
    }      
}

export async function addBoard(board) {
    try {
        const savedBoard = await boardService.save(board)       
        store.dispatch(getCmdAddBoard(savedBoard))
        await loadBoards({userId: board.userId})
        return savedBoard
    } catch (err) { 
        console.error('Cannot add board', err)
        throw err
    }   
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)       
        store.dispatch(getCmdUpdateBoard(savedBoard))
        loadBoards({userId: board.userId})
        return savedBoard
    } catch (err) { 
        console.error('Cannot update board', err)
        throw err
    }   
}

export async function removeBoard(boardId, userId) {
    try {
        await boardService.remove(boardId)      
        store.dispatch(getCmdRemoveBoard(boardId))
        await loadBoards({userId})
    } catch (err) { 
        console.error('Cannot remove board', err)
        throw err
    }       
}

//command creators
function getCmdLoadBoards(boards) {
    return { 
        type: SET_BOARDS, 
        boards 
    }
}

function getCmdLoadBoard(board) {
    return { 
        type: SET_BOARD, 
        board 
    }
}   

function getCmdAddBoard(board) {
    return { 
        type: ADD_BOARD, 
        board 
    }
}

function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}   

function getCmdRemoveBoard(boardId) {
    return { 
        type: REMOVE_BOARD, 
        boardId 
    }
}


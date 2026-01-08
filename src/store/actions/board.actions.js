import { boardService } from "../../services/board.service";
import { ADD_BOARD, REMOVE_BOARD, SET_BOARD, SET_BOARDS, SET_ERROR, SET_LOADING, UPDATE_BOARD } from "../reducers/board.reducer";
import { store } from "../store"

export async function loadBoards() {
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    try {
        const boards = await boardService.query()
        store.dispatch(getCmdLoadBoards(boards))    
    } catch (err) { 
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot load boards', err)
        throw err
    } finally {
        store.dispatch(getCmdSetLoading(false))
    }
}

export async function loadBoard() {
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    
    try {
        const board = await boardService.loadOrCreateSelectedBoard()
        store.dispatch(getCmdLoadBoard(board)) 
        return board
    } catch (err) { 
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot load board', err)
        throw err
    }  finally {
        store.dispatch(getCmdSetLoading(false))
    }    
}

export function selectBoard(board) {
    store.dispatch(getCmdLoadBoard(board))
}

export async function createBoard() {
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    try {
        const newBoard = await boardService.createEmptyBoard()
        store.dispatch(getCmdCreateBoard(newBoard))
        store.dispatch(getCmdLoadBoard(newBoard)) 
        return newBoard
    } catch (err) {
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot create board', err)
        throw err
    } finally {
        store.dispatch(getCmdSetLoading(false))
    }
}

export async function updateBoard(board) {
    console.log("🚀 ~ updateBoard ~ board:", board)
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    try {
        const updatedBoard = await boardService.update(board)       
        store.dispatch(getCmdUpdateBoard(updatedBoard))
        return updatedBoard
    } catch (err) { 
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot update board', err)
        throw err
    } finally { 
        store.dispatch(getCmdSetLoading(false))
    }
}

export async function removeBoard(boardId) {
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))    
    try {
        await boardService.remove(boardId)      
        store.dispatch(getCmdRemoveBoard(boardId))
        await loadBoards()
    } catch (err) { 
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot remove board', err)
        throw err
    } finally {
        store.dispatch(getCmdSetLoading(false))
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

function getCmdCreateBoard(board) {
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

function getCmdSetLoading(isLoading) {
    return {
        type: SET_LOADING,
        isLoading
    }
}   

function getCmdSetError(error) {
    return {
        type: SET_ERROR,
        error
    }
}   
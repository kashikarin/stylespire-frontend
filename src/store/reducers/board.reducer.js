export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_BOARD = 'SET_BOARD'
export const SET_BOARDS = 'SET_BOARDS'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

const initialState = {
    board: null,
    boards: [],
    isLoading: false,
    error: null
}

export function boardReducer(state = initialState, action = {}) {
    let newState = state
    switch (action.type) {
        case ADD_BOARD:
            newState = { 
                    ...state, 
                    boards: [...state.boards, action.board] 
            }
            break
        case UPDATE_BOARD:
            newState = {
                ...state,
                boards: state.boards.map(board => board._id === action.board._id ? action.board : board),
                board: action.board
            }
            break
        case REMOVE_BOARD:
            newState = { 
                ...state, 
                boards: state.boards.filter(b => b._id !== action.boardId)
            }
            break
        case SET_BOARD:
            newState = { 
                ...state, 
                board: action.board  
            }
            break    
        case SET_BOARDS:
            newState = { 
                ...state, 
                boards: action.boards  
            }
            break 
        case SET_LOADING:
            newState = {
                ...state,
                isLoading: action.isLoading
            }
            break
        case SET_ERROR:
            newState = {
                ...state,
                error: action.error
            }
            break   
        default: 
    }
    return newState
}

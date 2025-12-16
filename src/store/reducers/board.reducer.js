export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_BOARD = 'SET_BOARD'
export const SET_BOARDS = 'SET_BOARDS'

const initialState = {
    board: null,
    boards: [],
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
                boards: state.boards.map(board => board._id === action.board._id ? action.board : board)
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
        default: 
    }
    return newState
}

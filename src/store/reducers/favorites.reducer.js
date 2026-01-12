export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const SET_FAVORITE = 'SET_FAVORITE'
export const SET_FAVORITES = 'SET_FAVORITES'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'    

const initialState = {
    favorite: null,
    favorites: [],
    loading: false,
    error: null
}

export function favoriteReducer(state = initialState, action = {}) {
    let newState = state
    switch (action.type) {
        case ADD_FAVORITE:
            newState = { 
                    ...state, 
                    favorites: [...state.favorites, action.favorite] 
                }
            break
        case REMOVE_FAVORITE:
            newState = { 
                ...state, 
                favorites: state.favorites.filter(fav => fav._id !== action.favoriteId) 
            }
            break
        case SET_FAVORITE:
            newState = { 
                ...state, 
                favorite: action.favorite  
            }
            break    
        case SET_FAVORITES:
            newState = { 
                ...state, 
                favorites: action.favorites  
            }
            break 
        case SET_LOADING:
            newState = {
                ...state,
                loading: action.isLoading
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

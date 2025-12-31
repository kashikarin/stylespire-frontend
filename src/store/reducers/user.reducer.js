export const SET_LOGGEDINUSER = 'SET_LOGGEDINUSER'
export const SET_AUTH_MODE = 'SET_AUTH_MODE'
export const SET_USER_LOADING = 'SET_USER_LOADING'

const initialState = {
  loggedInUser: null,
  isLoading: false,
  authMode: null,
}

export function UserReducer(state = initialState, action){
    let newState = state
    switch (action.type) {
        case SET_USER_LOADING:
            newState = {
                ...state,
                isLoading: action.isLoading
            }
            break
        case SET_LOGGEDINUSER:
            newState = {
                ...state,
                loggedInUser: action.user,
                isLoading: false
            }
            break
        case SET_AUTH_MODE:
            newState = {
                ...state, 
                authMode: action.authMode
            }
            break
        default: 
    }
    return newState
}
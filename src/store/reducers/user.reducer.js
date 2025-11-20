export const SET_LOGGEDINUSER = 'SET_LOGGEDINUSER'
export const SET_AUTH_MODE = 'SET_AUTH_MODE'

const initialState = {
  loggedInUser: null,
  authMode: null
}

export function UserReducer(state = initialState, action){
    let newState = state
    switch (action.type) {
        case SET_LOGGEDINUSER:
            newState = {
                ...state,
                loggedInUser: action.user
            }
            break
        case SET_AUTH_MODE:
            newState = {
                ...state, 
                authMode: action.authMode
            }
    }
    return newState
}
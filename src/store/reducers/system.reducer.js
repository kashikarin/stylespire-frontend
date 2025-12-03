export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const OPEN_STYLEME_MODAL = 'OPEN_STYLEME_MODAL'
export const CLOSE_STYLEME_MODAL = 'CLOSE_STYLEME_MODAL'

const initialState = {
    isLoading: false,
    isStyleMeModalOpen: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }
        case LOADING_DONE:
            return { ...state, isLoading: false }
        case OPEN_STYLEME_MODAL:
            return { ...state, isStyleMeModalOpen: true }
        case CLOSE_STYLEME_MODAL: 
            return { ...state, isStyleMeModalOpen: false }
        default: return state
    }
}

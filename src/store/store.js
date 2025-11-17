import { legacy_createStore as createStore, combineReducers } from 'redux'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
  systemModule: systemReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined

export const store = createStore(rootReducer, middleware)

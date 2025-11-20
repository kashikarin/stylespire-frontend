import { legacy_createStore as createStore, combineReducers } from 'redux'
import { systemReducer } from './reducers/system.reducer'
import { UserReducer } from './reducers/user.reducer'
import { compose } from 'redux'

const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: UserReducer
})

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

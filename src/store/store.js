import { legacy_createStore as createStore, combineReducers } from 'redux'
import { systemReducer } from './reducers/system.reducer'
import { UserReducer } from './reducers/user.reducer'
import { compose } from 'redux'
import { favoriteReducer } from './reducers/favorites.reducer'


const rootReducer = combineReducers({
  systemModule: systemReducer,
  userModule: UserReducer,
  favoriteModule: favoriteReducer
})

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

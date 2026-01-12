import { legacy_createStore as createStore, combineReducers } from 'redux'
import { UserReducer } from './reducers/user.reducer'
import { compose } from 'redux'
import { favoriteReducer } from './reducers/favorites.reducer'
import { boardReducer } from './reducers/board.reducer'


const rootReducer = combineReducers({
  userModule: UserReducer,
  favoriteModule: favoriteReducer,
  boardModule: boardReducer
})

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

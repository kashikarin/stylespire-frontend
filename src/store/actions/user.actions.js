import { userService } from "../../services/user.service";
import { SET_AUTH_MODE, SET_LOGGEDINUSER } from "../reducers/user.reducer";
import { store } from "../store";

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({
      type: SET_LOGGEDINUSER,
      user,
    })
    return user
  } catch (err) {
    console.error('Cannot login', err)
    throw err
  }
}

export async function signup(signingUpUser) {
  try {
    const user = await userService.signup(signingUpUser)
    store.dispatch({
      type: SET_LOGGEDINUSER,
      user,
    })
    return user
  } catch (err) {
    console.error('Cannot signup', err)
    throw err
  }
}

export async function logout() {
    console.log('LOG OUT ACTION RUNS')
  try {
    await userService.logout()
    store.dispatch({
      type: SET_LOGGEDINUSER,
      user: null,
    })
  } catch (err) {
    console.error('Cannot logout', err)
    throw err
  }
}

// export async function loadUser(userId) {
//   try {
//     const user = await userService.getById(userId)
//     store.dispatch({ type: SET_WATCHED_USER, user })
//   } catch (err) {
//     console.error('Cannot load user', err)
//     throw err
//   }
// }

export function setAuthMode(authMode) {
  store.dispatch({
    type: SET_AUTH_MODE,
    authMode
  })
}
import { userService } from "../../services/user.service";
import { CLOSE_STYLEME_MODAL, OPEN_STYLEME_MODAL } from "../reducers/system.reducer";
import { SET_AUTH_MODE, SET_LOGGEDINUSER, SET_USER_LOADING } from "../reducers/user.reducer";
import { store } from "../store";

export async function login(credentials) {
  store.dispatch(getCmdSetLoading(true))
  try {
    const user = await userService.login(credentials)
    store.dispatch(getCmdLogin(user))
    return user
  } catch (err) {
    console.error('Cannot login', err)
    store.dispatch(getCmdSetLoading(false))
    throw err
  }
}

export async function signup(signingUpUser) {
  store.dispatch(getCmdSetLoading(true))
  try {
    const user = await userService.signup(signingUpUser)
    store.dispatch(getCmdSignup(user))
    return user
  } catch (err) {
    console.error('Cannot signup', err)
    store.dispatch(getCmdSetLoading(false))
    throw err
  }
}

export async function logout() {
  store.dispatch(getCmdSetLoading(true))
  try {
    await userService.logout()
  } catch (err) {
    console.error('Cannot logout', err)
  } finally {
    store.dispatch(getCmdLogout())
    store.dispatch(getCmdSetLoading(false))
  }
}

export function setAuthMode(authMode) {
  store.dispatch(getCmdSetAuthMode(authMode))
}

export async function loadCurrentUser(){
  store.dispatch(getCmdSetLoading(true))
  try {
    const user = await userService.getCurrentUser()
    store.dispatch(getCmdLoadCurrentUser(user))
  } catch (err) {
    console.error('Cannot load current user', err)
    store.dispatch(getCmdSetLoading(false))
  }
}

export function openStyleMeModal(){
  store.dispatch(getCmdOpenStyleMeModal())
}

export function closeStyleMeModal(){
  store.dispatch(getCmdCloseStyleMeModal())
}

//cmd creators

function getCmdSetLoading(isLoading){
    return {
        type: SET_USER_LOADING,
        isLoading
    }
}

function getCmdLogin(user){
    return {
        type: SET_LOGGEDINUSER,
        user 
    }
}

function getCmdSignup(user){
    return {
        type: SET_LOGGEDINUSER,
        user 
    }
}

function getCmdLogout(){
    return {
        type: SET_LOGGEDINUSER,
        user: null
    }
}

function getCmdSetAuthMode(authMode){
    return {
        type: SET_AUTH_MODE,
        authMode
    }
}

function getCmdOpenStyleMeModal(){
    return{
        type: OPEN_STYLEME_MODAL
    }
}

function getCmdCloseStyleMeModal(){
    return{
        type: CLOSE_STYLEME_MODAL
    }
}

function getCmdLoadCurrentUser(user) {
  return {
    type: SET_LOGGEDINUSER,
    user
  }
}
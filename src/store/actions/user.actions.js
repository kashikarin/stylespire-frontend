import { userService } from "../../services/user.service";
import { CLOSE_STYLEME_MODAL, OPEN_STYLEME_MODAL } from "../reducers/system.reducer";
import { SET_AUTH_MODE, SET_LOGGEDINUSER } from "../reducers/user.reducer";
import { store } from "../store";

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch(getCmdLogin(user))
    return user
  } catch (err) {
    console.error('Cannot login', err)
    throw err
  }
}

export async function signup(signingUpUser) {
  try {
    const user = await userService.signup(signingUpUser)
    store.dispatch(getCmdSignup(user))
    return user
  } catch (err) {
    console.error('Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch(getCmdLogout())
  } catch (err) {
    console.error('Cannot logout', err)
    throw err
  }
}

export function setAuthMode(authMode) {
  store.dispatch(getCmdSetAuthMode(authMode))
}

export async function getUserOnRefresh(){
    try {
        const user = await userService.getCurrentUser()
        console.log("🚀 ~ user:", user)
        if (user) store.dispatch(getCmdGetUserOnRefresh(user))
    } catch(err) {
        console.error('Cannot refresh loggedin user', err)
        throw err
    }
    
}

export function openStyleMeModal(){
  store.dispatch(getCmdOpenStyleMeModal())
}

export function closeStyleMeModal(){
  store.dispatch(getCmdCloseStyleMeModal())
}

//cmd creators
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
function getCmdGetUserOnRefresh(user){
    return{
        type: SET_LOGGEDINUSER,
        user
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
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer";
import { store } from "../store";

export function setLoadingStart(){
    store.dispatch(getCmdSetLoadingStart())
}

export function setLoadingDone(){
    store.dispatch(getCmdSetLoadingDone())
}

//comand creators

function getCmdSetLoadingStart(){
    return(
        {type: LOADING_START}
    )
}

function getCmdSetLoadingDone(){
    return(
        {type: LOADING_DONE}
    )
}
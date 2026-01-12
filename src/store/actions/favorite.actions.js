import { favoriteService } from "../../services/favorite.service";
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_ERROR, SET_FAVORITE, SET_FAVORITES, SET_LOADING } from "../reducers/favorites.reducer";
import { store } from "../store"

export async function addFavorite(userId, image) {
    const favoriteToSave = favoriteService.createFavorite(userId, image)
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    try {
        const savedFavorite = await favoriteService.save(favoriteToSave)
        store.dispatch(getCmdAddFavorite(savedFavorite))
        await loadFavorites({ userId })
        return savedFavorite
    } catch (err) {
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot add favorite', err)
        throw err
    } finally {
        store.dispatch(getCmdSetLoading(false))
    }
}

export async function loadFavorites(filterFavoritesBy){
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))
    try {
        const favorites = await favoriteService.query(filterFavoritesBy)
        store.dispatch(getCmdSetFavorites(favorites))
  } catch (err) {
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot load favorites', err)
        throw err
  } finally {
        store.dispatch(getCmdSetLoading(false))
  } 
}

export async function loadFavorite(favoriteId){
    store.dispatch(getCmdSetLoading(true))
    store.dispatch(getCmdSetError(null))    
    try {
        const favorite = await favoriteService.getById(favoriteId)
        store.dispatch(getCmdSetFavorite(favorite))
  } catch (err) {
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot load favorite', err)
        throw err
  } finally {
        store.dispatch(getCmdSetLoading(false))
  } 
}

export async function removeFavorite(favoriteId) {
    store.dispatch(getCmdSetError(null))    
    store.dispatch(getCmdSetLoading(true))
    try {
        await favoriteService.remove(favoriteId)
        store.dispatch(getCmdRemoveFavorite(favoriteId))
    } catch (err) {
        store.dispatch(getCmdSetError(err.message))
        console.error('Cannot remove favorite', err)
        throw err
    } finally {
        store.dispatch(getCmdSetLoading(false))
    }
} 

//command creators
function getCmdAddFavorite(favorite){
    return {
        type: ADD_FAVORITE,
        favorite
    }
}

function getCmdSetFavorites(favorites){
    return {
        type: SET_FAVORITES,
        favorites
    }
}

function getCmdSetFavorite(favorite){
    return {
        type: SET_FAVORITE,
        favorite
    }
}

function getCmdRemoveFavorite(favoriteId){
    return {
        type: REMOVE_FAVORITE,
        favoriteId
    }
}

function getCmdSetLoading(isLoading) {
    return {
        type: SET_LOADING,
        isLoading
    }
}   

function getCmdSetError(error) {
    return {
        type: SET_ERROR,
        error
    }
}   

function getCmdFavoriteImageProcessed(processedImage, favoriteId) {
    return {
        type: FAVORITE_IMAGE_PROCESSED,
        processedImage,
        favoriteId
    }
}    
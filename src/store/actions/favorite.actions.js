import { favoriteService } from "../../services/favorite.service";
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITE, SET_FAVORITES } from "../reducers/favorites.reducer";
import { store } from "../store";

export async function addFavorite(userId, userFullname, imageUrl, imageId, imageDescription){
    const favoriteToSave = favoriteService.createFavorite(userId, userFullname, imageUrl, imageId, imageDescription)
    console.log("🚀 ~ favoriteToSave:", favoriteToSave)
    try {
        const savedFavorite = await favoriteService.save(favoriteToSave)
        console.log("🚀 ~ savedFavorite:", savedFavorite)
        store.dispatch(getCmdAddFavorite(savedFavorite))
        console.log("🚀 ~ savedFavorite:", savedFavorite)
        await loadFavorites({userId})
        return savedFavorite
  } catch (err) {
        console.error('Cannot add favorite', err)
        throw err
  }
}

export async function loadFavorites(filterFavoritesBy){
    console.log("🚀 ~ filterFavoritesBy:", filterFavoritesBy)
    try {
        const favorites = await favoriteService.query(filterFavoritesBy)
        store.dispatch(getCmdSetFavorites(favorites))
  } catch (err) {
        console.error('Cannot load favorites', err)
        throw err
  }
}

export async function loadFavorite(favoriteId){
    try {
        const favorite = await favoriteService.getById(favoriteId)
        store.dispatch(getCmdSetFavorite(favorite))
  } catch (err) {
        console.error('Cannot load favorite', err)
        throw err
  }
}

export async function removeFavorite(favoriteId) {
  try {
    await favoriteService.remove(favoriteId)
    store.dispatch(getCmdRemoveFavorite(favoriteId))
    await loadFavorites({})
  } catch (err) {
    console.error('Cannot remove favorite', err)
    throw err
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
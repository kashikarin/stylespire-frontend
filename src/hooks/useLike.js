import { useSelector } from "react-redux"
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useLike(){
    const favorites = useSelector(state => state.favoriteModule.favorites)
    const { loggedInUser } = useIsLoggedInUser()
    
    async function toggleLike(isLiked, imageUrl, imageId, imageDescription){
        if (!loggedInUser) return
        if (isLiked) {
            const fav = favorites.find(f => f.image.id === imageId)
            await removeFavorite(fav._id)
            await loadFavorites({userId: loggedInUser._id})
        } else addFavorite(
            loggedInUser._id,
            imageUrl, 
            imageId, 
            imageDescription
        )
    }
    
    function getIsLiked(imageId) {
        if (!loggedInUser) return
        return favorites.some(fav => fav.image.id === imageId)
    }

    return {
        getIsLiked,
        toggleLike
    }
}
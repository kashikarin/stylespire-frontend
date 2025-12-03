import { useSelector } from "react-redux"
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { setAuthMode } from "../store/actions/user.actions"

export function useLike(){
    const favorites = useSelector(state => state.favoriteModule.favorites)
    const { loggedInUser } = useIsLoggedInUser()
    
    async function toggleLike(isLiked, imageUrl, imageId, imageDescription){
        if (!loggedInUser) return
        console.log("🚀 ~ toggleLike ~ isLiked:", isLiked)
        if (isLiked) {
            const fav = favorites.find(f => f.image.id === imageId)
            await removeFavorite(fav._id)
            await loadFavorites({userId: loggedInUser._id})
        } else addFavorite(
                    loggedInUser._id, //later all user data in the backend
                    loggedInUser.fullname, 
                    imageUrl, 
                    imageId, 
                    imageDescription
                )
    }
    
    function getIsLiked(imageId) {
        if (!loggedInUser) return
        console.log("🚀 ~ favorites:", favorites)
        return favorites.some(fav => fav.image.id === imageId)
    }

    return {
        getIsLiked,
        toggleLike
    }
}
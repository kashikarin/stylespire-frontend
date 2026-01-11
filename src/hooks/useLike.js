import { useSelector } from "react-redux"
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useLike(){
    const favorites = useSelector(state => state.favoriteModule.favorites)
    const { loggedInUser } = useIsLoggedInUser()
    
    function getIsLiked(imageId) {
        if (!loggedInUser || !imageId) return false
        return favorites.some(fav => fav.image.id === imageId)
    }

    async function toggleLike({ imageId, imageUrl, imageDescription }){
        if (!loggedInUser || !imageId) return
        const isLiked = getIsLiked(imageId)

        if (isLiked) {
            const fav = favorites.find(f => f.image.id === imageId)
            if (!fav?._id) return

            await removeFavorite(fav._id)
            await loadFavorites({userId: loggedInUser._id})
        } else {
            addFavorite(loggedInUser._id, {
                id: imageId,
                url: imageUrl,
                description: imageDescription
            })
        }
    }

    return {
        getIsLiked,
        toggleLike
    }
}
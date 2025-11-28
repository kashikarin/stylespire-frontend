import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favorite.actions"
import { useSelector } from "react-redux"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useLike } from "./useLike"

export function useResults() {
    const location = useLocation()
    const { results: images } = location.state
    const { loggedInUser } = useIsLoggedInUser()
    const favorites = useSelector(state => state.favoriteModule.favorites)
    
    useEffect(()=>{
        console.log("🚀 ~ loggedInUser:", loggedInUser)
        if (!loggedInUser) return
        loadFavorites({userId: loggedInUser._id})
    }, [loggedInUser])

    return {
        images,
        loggedInUser,
    }
}
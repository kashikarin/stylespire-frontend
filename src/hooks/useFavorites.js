import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useFavorites(){
    const favorites = useSelector(state => state.favoriteModule.favorites)  
    const isLoading = useSelector(state => state.favoriteModule.isLoading)
    const [selectedFav, setSelectedFav] = useState(null)
    const { loggedInUser } = useIsLoggedInUser()

    useEffect(() => {
        if (!loggedInUser?._id) return

        const isTokenExpired = err =>
            err?.response?.data?.error === 'TOKEN_EXPIRED' || err?.error === 'TOKEN_EXPIRED'

        async function fetchFavorites() {
            try {
                await loadFavorites({ userId: loggedInUser._id })
            } catch (err) {
                if (isTokenExpired(err)) {
                    console.warn('Session expired (TOKEN_EXPIRED) while loading favorites.')
                } else {
                    console.error('Failed to load favorites:', err)
                }
            }
        }
        fetchFavorites()
    }, [loggedInUser?._id])

    function resetSelectedFav() {
        setSelectedFav(null)
    }

    function handleSelect(fav){
        setSelectedFav(fav)
    } 
    
    return {
        favorites: favorites || [],
        selectedFav,
        handleSelect,
        resetSelectedFav,
        isLoading
    }
}
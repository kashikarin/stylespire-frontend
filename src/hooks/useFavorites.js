import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useFavorites(){
    const favorites = useSelector(state => state.favoriteModule.favorites)  
    const isLoading = useSelector(state => state.favoriteModule.isLoading)
    const [selectedFav, setSelectedFav] = useState(null)
    const { loggedInUser } = useIsLoggedInUser()

    useEffect(()=>{
        if (!loggedInUser?._id) return
        loadFavorites({ userId: loggedInUser._id })
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
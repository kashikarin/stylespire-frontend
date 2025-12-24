import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useFavorites(){
    const favorites = useSelector(state => state.favoriteModule.favorites)  
    const [selectedFav, setSelectedFav] = useState(null)
    const { loggedInUser } = useIsLoggedInUser()
    const hasLoadedFavorites = useRef(false)

    useEffect(()=>{
        if (!loggedInUser?._id) return
        if (hasLoadedFavorites.current) return
        hasLoadedFavorites.current = true
        loadFavorites({ userId: loggedInUser._id })
    }, [loggedInUser._id])

    function resetSelectedFav() {
        setSelectedFav(null)
    }

    function handleSelect(fav){
        console.log("🚀 ~ fav:", fav)
        setSelectedFav(fav)
    } 
    
    return {
        favorites,
        selectedFav,
        handleSelect,
        resetSelectedFav

    }
}
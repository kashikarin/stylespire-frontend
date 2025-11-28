import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"


export function useFavorites(){
    const favorites = useSelector(state => state.favoriteModule.favorites)  
    const [selectedFav, setSelectedFav] = useState(null)
    const { loggedInUser} = useIsLoggedInUser()
    
    useEffect(()=>{
        if (!loggedInUser) return
        loadFavorites({ userId: loggedInUser._id })
    }, [loggedInUser])

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
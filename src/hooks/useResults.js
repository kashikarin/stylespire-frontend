import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { loadFavorites } from "../store/actions/favorite.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useResults() {
    const location = useLocation()
    const { results: images, formData } = location.state
    const { loggedInUser } = useIsLoggedInUser()
    
    useEffect(()=>{
        console.log("🚀 ~ loggedInUser:", loggedInUser)
        if (!loggedInUser) return
        loadFavorites({userId: loggedInUser._id})
    }, [loggedInUser])

    return {
        images,
        formData,
        loggedInUser,
    }
}
// useIsLoggedIn.js
import { useSelector } from "react-redux"

export function useIsLoggedInUser() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isLoading = useSelector(state => state.userModule.isLoading)
    
    return {
        loggedInUser,
        isLoggedInUser: !!loggedInUser,
        loading: isLoading,
        isGuest: !loggedInUser && !isLoading
    }
}
// useIsLoggedIn.js
import { useSelector } from "react-redux"

export function useIsLoggedInUser() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    return {
        loggedInUser,
        isLoggedInUser: !!loggedInUser
    }
}
import { logout, setAuthMode } from "../store/actions/user.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"

export function useFooterActions(){
    const { loggedInUser } = useIsLoggedInUser()
    
    function handleAuthClick(){
        if (loggedInUser) logout()
        else setAuthMode('login')
    }

    function resetAuthMode(){
        setAuthMode(null)
    }
    
    return{
        resetAuthMode,
        handleAuthClick
    }
}
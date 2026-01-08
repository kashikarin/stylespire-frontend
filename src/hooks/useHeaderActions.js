import { logout, setAuthMode } from '../store/actions/user.actions'

export function useHeaderActions(closeDropdown) {
    
    async function handleLogout() {
        await logout()
        closeDropdown()
    }

    function openLogin(){
        setAuthMode('login')
        closeDropdown()
    }

    function openSignup(){
        setAuthMode('signup')
        closeDropdown()
    }

    return{
        handleLogout,
        openLogin,
        openSignup
    }
}
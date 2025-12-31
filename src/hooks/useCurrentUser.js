import { useEffect } from "react"
import { loadCurrentUser, logout } from "../store/actions/user.actions"

export function useCurrentUser(){
    
    useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        if (!token) return
        loadCurrentUser()

        function handleStorageChange(e){
            if (e.key === 'accessToken' && !e.newValue){
                logout()
            }
        }
        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

}
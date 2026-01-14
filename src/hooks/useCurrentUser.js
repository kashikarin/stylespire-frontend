import { useEffect } from "react"
import { loadCurrentUser, resolveAuth } from "../store/actions/user.actions"

export function useCurrentUser(){
    useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        if (!token) {
            resolveAuth()
            return
        }
        
        loadCurrentUser()
    }, [])

}
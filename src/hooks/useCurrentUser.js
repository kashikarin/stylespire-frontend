import { useEffect } from "react"
import { loadCurrentUser } from "../store/actions/user.actions"

export function useCurrentUser(){
    
    useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        console.log("🚀 ~ useCurrentUser ~ token:", token)
        if (!token) return
        loadCurrentUser()
    }, [])

    // useEffect(()=>{
    //     const loadIfHasToken = () => {
    //         
    //         if (!token) return
    //         loadCurrentUser()
    //     }
    //     loadIfHasToken()
    // }, [])
    
    // const onStorage = (ev) => {
    //     if (ev.key === 'accessToken') loadIfHasToken
    // }
    
    // window.addEventListener('storage', onStorage)
    
    // return () => {
    //     window.removeEventListener('storage', onStorage)
    // }
}
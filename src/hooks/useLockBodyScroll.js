import { useEffect } from "react"

export function useLockBodyScroll() {
    useEffect(()=>{
            const originalStyle = {
                bodyOverflow: document.body.style.overflow,     
                htmlOverflow: document.documentElement.style.overflow
            }
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
        
            return ()=> {
                document.body.style.overflow = originalStyle.bodyOverflow
                document.documentElement.style.overflow = originalStyle.htmlOverflow
            }

    }, [])    

}
import { createPortal } from "react-dom"

export function Portal({children}) {
    const portalRoot = document.getElementById('portal-root')
    
    return(
        createPortal(children, portalRoot)     
    )
}
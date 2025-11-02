import { Link, NavLink } from "react-router-dom"
import { useViewport } from "../customHooks/useViewport"
import { ReactSVG } from "react-svg"

export function AppHeader(){
    const { isMobile, isTablet, isDesktop, layout } = useViewport()
    
    return(
        <div className='app-header-container full'>
            <nav>            
                <Link to='/'><ReactSVG src='/svgs/logo.svg'/></Link>
                <NavLink to='/favorites'>
                    Favorites
                </NavLink>
            </nav>
        </div>
    )
}
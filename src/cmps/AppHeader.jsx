import { Link } from "react-router-dom"
import { useViewport } from "../customHooks/useViewport"
import { ReactSVG } from "react-svg"

export function AppHeader(){
    const { isMobile, isTablet, isDesktop, layout } = useViewport()

    return(
        <div className='app-header-container full'>
            <nav>            
                <ReactSVG src='/svgs/logo.svg'/>
                <Link to='/favorites'>
                    Favorites
                </Link>
            </nav>
        </div>
    )
}
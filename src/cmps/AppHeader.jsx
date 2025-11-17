import { Link, NavLink } from "react-router-dom"
import { useViewport } from "../customHooks/useViewport"
import { ReactSVG } from "react-svg"

export function AppHeader(){
    const { isMobile, isTablet, isDesktop, layout } = useViewport()
    
    return(
        <div className='app-header-container full sticky top-0 z-10 border-b border-primary-dark w-full min-w-[100dvw] h-[80px]'>
            <nav className='flex justify-between items-center w-full min-h-[80px] py-2'>            
                <Link to='/' className='font-semibold rounded-[10px] text-primary-dark hover:text-secondary'>
                    <span>StyleSpire</span>
                </Link>
                <NavLink to='/favorites' className='font-semibold rounded-[10px] text-primary-dark hover:text-secondary'>
                    Favorites
                </NavLink>
            </nav>
        </div>
    )
}
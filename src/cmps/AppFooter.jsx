import { Link } from "react-router-dom"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { ReactSVG } from "react-svg"
import { useFooterActions } from "../hooks/useFooterActions"

export function AppFooter(){
    const { loggedInUser } = useIsLoggedInUser()
    const { resetAuthMode, handleAuthClick } = useFooterActions()

    return(
        <footer 
            className="
                safe-pb
                fixed 
                py-3
                h-[4rem]
                bottom-0 
                grid grid-cols-[minmax(20px,1fr)_minmax(auto,theme(screens.mobile))_minmax(20px,1fr)]
                w-full
                border border-t-primary-dark
                text-primary-dark
                bg-primary-bg
                z-50
            "
        >
            <nav 
                className="
                    flex justify-between items-center 
                    col-start-2

                "
            >
                <Link  
                        to='/' 
                        className='
                            flex flex-col items-center 
                            text-xs 
                        '
                        onClick={resetAuthMode}
                    >
                    <ReactSVG 
                        src='/svgs/home-icon.svg' 
                    />
                    Home
                </Link>
                {loggedInUser &&<Link 
                    to='/favorites'
                    className='
                        flex flex-col items-center 
                        text-xs
                    '
                    onClick={resetAuthMode}
                >
                    <ReactSVG src='/svgs/heart-icon-footer.svg'/>
                    Favorites
                </Link>}
                {loggedInUser && <Link 
                    to='/board'
                    className='
                        flex flex-col items-center 
                        text-xs
                    '
                    onClick={resetAuthMode}
                >
                    <ReactSVG src='/svgs/board-icon.svg'/>
                    StyleBoard
                </Link>}
                <Link 
                        className='
                            flex flex-col items-center
                            text-xs
                        '
                        onClick={handleAuthClick}
                    > 
                        <ReactSVG src='/svgs/user-icon.svg' />
                        {loggedInUser ? 'Logout' : 'Login'}    
                </Link>
            </nav>
        </footer>
    )
}
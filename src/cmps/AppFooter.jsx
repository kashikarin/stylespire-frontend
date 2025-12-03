import { Link } from "react-router-dom"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { ReactSVG } from "react-svg"
import { logout, setAuthMode } from "../store/actions/user.actions"

export function AppFooter(){
    const { loggedInUser } = useIsLoggedInUser()

    return(
        <footer 
            className="
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
                    >
                    <ReactSVG 
                        src='/svgs/home-icon.svg' 
                    />
                    Home
                </Link>
                <Link 
                    to='/favorites'
                    className='
                        flex flex-col items-center 
                        text-xs
                    '
                >
                    <ReactSVG src='/svgs/heart-icon-footer.svg'/>
                    Favorites
                </Link>
                <Link 
                        className='
                            flex flex-col items-center
                            text-xs
                        '
                        onClick={()=> {
                            if (loggedInUser) logout()
                            else setAuthMode('signin') 
                        }}
                    > 
                        <ReactSVG src='/svgs/user-icon.svg' />
                        {loggedInUser ? 'Logout' : 'Login'}    
                </Link>
            </nav>
        </footer>
    )
}
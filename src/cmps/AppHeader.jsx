import { Link, NavLink } from "react-router-dom"
import { ReactSVG } from "react-svg"
import { UserLetterCircle } from "./UserLetterCircle"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { breakpoints } from "../util/breakpoints"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { Portal } from "./Portal"
import { useDropdownController } from "../hooks/useDropdownController"
import { useHeaderActions } from "../hooks/useHeaderActions"
import { useDemoLogin } from "../hooks/useDemoLogin"

export function AppHeader(){
    const { 
        isDropdownOpen, 
        close: closeDropdown,
        toggle, 
        buttonRef,
        dropdownRef,
        coords
        } = useDropdownController( { withPosition: true } )
    
        const { onLoginDemo, isLoading, error } = useDemoLogin()

    const { loggedInUser } = useIsLoggedInUser()

    const isMobile = useMediaQuery(breakpoints.mobile)
    const isDesktop = useMediaQuery(breakpoints.desktop)

    const fullName = loggedInUser?.fullname
    const firstName = fullName ? fullName.split(' ')[0] : ''

    const { handleLogout, openLogin, openSignup } = useHeaderActions(closeDropdown)
    const dropdown = (
        <div 
            className={`
                bg-white 
                rounded-xl 
                shadow-shadow-strong 
                ${isDesktop ? 'min-w-[200px]' : 'min-w-[150px]'}
                ${isDesktop ? 'py-2 mt-2' : 'py-1 mt-1'}
                z-20 
                overflow-hidden
            `} 
        ref={dropdownRef}
        style={{
            position: 'absolute',
            top: coords.top + 15,
            right: coords.right,
        }}
        >
            {loggedInUser ? (<div 
                className={`
                    flex flex-col 
                    rounded-lg 
                    ${isDesktop ? 'text-base' : 'text-sm'}
                    py-1
                `}>
                <div 
                    className={`
                        ${isDesktop ? 'px-5 pt-3 pb-3 m-0' : 'px-4 pt-2 pb-2 m-0'}
                        text-primary-dark
                        
                        font-semibold
                    `}
                >
                    {`Hi ${firstName}`} 
                </div>
                <div className="h-[1px] bg-gray2 my-2"></div>
                {/* <div className="menu-divider"></div> */}
                <button 
                    className={`
                        block 
                        text-primary-dark 
                        ${isDesktop ? 'px-5 pt-4 pb-3 m-0' : 'px-4 pt-2 pb-2 m-0'}
                        font-normal 
                        tracking-tighter 
                        bg-transparent 
                        cursor-pointer 
                        text-left 
                        w-full 
                        relative
                        before:content-['']
                        before:absolute before:left-0 before:top-0
                        before:h-full before:w-[4px]
                        before:bg-primary-dark
                        before:origin-left
                        before:scale-x-0
                        before:transition-transform before:duration-200 before:ease-in-out
                        hover:before:scale-x-100
                    `}
                    onClick={handleLogout}
                >
                    Log out
                </button>
                </div>) : (
                <div className="flex flex-col rounded-lg py-2">
                    <button
                        className="
                            block 
                            text-primary-dark 
                            px-5 pt-4 pb-3 m-0 
                            font-semibold 
                            tracking-tight 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                            rounded-md
                            bg-[rgba(64,112,118,0.06)]
                            transition-all duration-200

                            before:content-['']
                            before:absolute before:left-0 before:top-0
                            before:h-full before:w-[4px]
                            before:bg-primary-dark
                            before:origin-left
                            before:scale-x-0
                            before:transition-transform before:duration-200 before:ease-in-out

                            hover:bg-[rgba(64,112,118,0.12)]
                            hover:before:scale-x-100
                        "
                        onClick={async () => {
                            await onLoginDemo()
                            if (!error) closeDropdown()
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Starting demo…' : 'Try demo'}
                    </button>

                    {error && (
                        <p className="text-xs text-rose-700 mt-2">
                            {error}
                        </p>
                    )}
        
                    <button
                        className="
                            block 
                            text-primary-dark 
                            px-5 pt-4 pb-3 m-0 
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                            before:content-['']
                            before:absolute before:left-0 before:top-0
                            before:h-full before:w-[4px]
                            before:bg-primary-dark
                            before:origin-left
                            before:scale-x-0
                            before:transition-transform before:duration-200 before:ease-in-out

                            hover:before:scale-x-100
                        "
                        onClick={openLogin}
                    >
                        Log in
                    </button>
                    <button
                        className="
                            block 
                            text-primary-dark 
                            px-5 pt-4 pb-3 m-0 
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            relative
                            w-full 
                            before:content-['']
                            before:absolute before:left-0 before:top-0
                            before:h-full before:w-[4px]
                            before:bg-primary-dark
                            before:origin-left
                            before:scale-x-0
                            before:transition-transform before:duration-200 before:ease-in-out

                            hover:before:scale-x-100
                        "
                        onClick={openSignup}
                    >
                        Sign up
                    </button>
                </div>)}
            </div>
  )

    return(
        <>
            <div 
                className='
                    safe-pt
                    app-header-container full 
                    bg-primary-bg 
                    sticky top-0 
                    z-10 
                    border-b border-primary-dark 
                    w-full min-w-[100dvw] h-[80px]
                '>
                <nav 
                    className='
                        flex justify-between items-center 
                        w-full min-h-[80px] 
                        py-1
                    '
                >            
                    <Link to='/' className='m-0 p-0'>
                        <img 
                            src="/imgs/sslogo.png" 
                            alt="stylespire logo" 
                            className={isMobile? 'h-[50px] w-[60px]' : 'h-[55px] w-[65px]'}/>
                    </Link>
                    {(!isMobile) && <div 
                        className={`
                            flex justify-end items-center gap-8
                            ${isDesktop ? 'text-base' : 'text-sm'}
                        `}
                    >
                        {loggedInUser && 
                            <>
                                <NavLink
                                    to='/board'
                                    className='
                                        font-semibold
                                        p-0 m-0 
                                        rounded-[10px] 
                                        text-primary-dark 
                                        hover:text-secondary
                                    '
                                >
                                    StyleBoard
                                </NavLink>
                                <NavLink 
                                    to='/favorites' 
                                    className='
                                        font-semibold 
                                        p-0 m-0 
                                        rounded-[10px] 
                                        text-primary-dark 
                                        hover:text-secondary
                                    '
                                >
                                    Favorites
                                </NavLink>
                            </>
                        }
                        <button 
                            className='
                                bg-transparent 
                                rounded-2xl 
                                h-[40px]
                                p-0 m-0
                                px-3 
                                font-medium text-sm 
                                whitespace-nowrap
                            ' 
                            ref={buttonRef} onClick={toggle}>
                            {(loggedInUser) ? 
                                <UserLetterCircle username={loggedInUser.fullname}/> :
                                <ReactSVG src='/svgs/hamburger-icon.svg'/>
                            }
                        </button>
                    </div>}
                </nav>
            </div>
            {isDropdownOpen && (
                <Portal>
                    {dropdown}
                </Portal>
            )}
        </>
    )
}
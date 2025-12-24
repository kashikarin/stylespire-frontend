import { Link, NavLink, useLocation } from "react-router-dom"
import { ReactSVG } from "react-svg"
import { UserLetterCircle } from "./UserLetterCircle"
import { useEffect, useRef, useState } from "react"
import { logout, setAuthMode } from "../store/actions/user.actions"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { breakpoints } from "../util/breakpoints"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { Portal } from "./Portal"
import { useDropdownController } from "../hooks/useDropdownController"

export function AppHeader(){
    const { 
        isDropdownOpen, 
        close,
        toggle, 
        buttonRef,
        dropdownRef,
        coords
        } = useDropdownController( { withPosition: true } )
    const location = useLocation()
    const { loggedInUser } = useIsLoggedInUser()
    const isHomePage = location.pathname === '/'
    const isMobile = useMediaQuery(breakpoints.mobile)
    const isStyleBoardPage = location.pathname === '/board'

    const fullName = loggedInUser?.fullname
    const firstName = fullName ? fullName.split(' ')[0] : ''

    function onOpenAuthModal(mode = 'login') {
        setAuthMode(mode)
        close()
    }

    async function handleLogout() {
        try {
            await logout()
            close()
        } catch (err) {
            console.error('Logout failed:', err)
        }
    }

    const dropdown = (
        <div 
            className="
                bg-white 
                rounded-xl 
                shadow-shadow-strong 
                min-w-[200px] 
                py-2 mt-2 
                z-100 
                overflow-hidden
            " 
        ref={dropdownRef}
        style={{
            position: 'absolute',
            top: coords.top + 10,
            right: coords.right,
        }}
        >
            {(loggedInUser) ? (<div className="flex flex-col rounded-lg py-2">
                <div className="
                    px-5 pt-3 pb-3 m-0
                    text-primary-dark
                    text-base
                    font-semibold
                ">
                    {`Hi ${firstName}`} 
                </div>
                <div className="h-[1px] bg-gray2 my-2"></div>
                {/* <div className="menu-divider"></div> */}
                <button 
                    className="
                        block 
                        text-primary-dark 
                        px-5 pt-4 pb-3 m-0 
                        text-base 
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
                            text-base 
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
                        onClick={()=> onOpenAuthModal('login')}
                    >
                        
                        Log in
                    </button>
                    <button
                        className="
                            block 
                            text-primary-dark 
                            px-5 pt-4 pb-3 m-0 
                            text-base 
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
                        onClick={()=> onOpenAuthModal('signup')}
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
                    app-header-container full 
                    bg-primary-bg 
                    sticky top-0 
                    z-10 
                    border-b border-primary-dark 
                    w-full min-w-[100dvw] h-[80px]
                '>
                <nav className='flex justify-between items-center w-full min-h-[80px] py-2'>            
                    <Link to='/' className='m-0 p-0'>
                        <img src="/imgs/sslogo.png" alt="stylespire logo" className='h-12 w-14'/>
                    </Link>
                    {(!isMobile) && <div 
                        className="
                            flex justify-end items-center gap-8
                        "
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
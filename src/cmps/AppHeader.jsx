import { Link, NavLink } from "react-router-dom"
import { useViewport } from "../customHooks/useViewport"
import { ReactSVG } from "react-svg"
import { UserLetterCircle } from "./UserLetterCircle"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { login, logout, setAuthMode, signup } from "../store/actions/user.actions"
import { useSelector } from "react-redux"
import { isAuthenticated } from "../services/user.service"

export function AppHeader(){
    const { isMobile, isTablet, isDesktop, layout } = useViewport()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)    
    const buttonRef = useRef()
    const dropdownRef = useRef()
    const [coords, setCoords] = useState({ top: 0, right: 0 })
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
        let portalRoot = document.getElementById('portal-root')
        if (!portalRoot) {
            portalRoot = document.createElement('div')
            portalRoot.id = 'portal-root'
            document.body.appendChild(portalRoot)
        }
    }, [])

  function updateMenuPosition() {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setCoords({
      top: rect.bottom + window.scrollY + 8,
      right: window.innerWidth - rect.right - window.scrollX - 8,
    })
  }

  function toggleDropdown() {
    if (!isDropdownOpen) updateMenuPosition()
    setIsDropdownOpen((prev) => !prev)
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)
         ) {
        setIsDropdownOpen(false)
      }
    }

    function handleEsc(e) {
      if (e.key === 'Escape') setIsDropdownOpen(false)
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEsc)
      window.addEventListener('resize', updateMenuPosition)
      window.addEventListener('scroll', updateMenuPosition)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition)
    }
  }, [isDropdownOpen])

    function onOpenAuthModal(mode = 'login') {
        setAuthMode(mode)
        setIsDropdownOpen(false)
    }

    async function handleLogout() {
        try {
            await logout()
            setIsDropdownOpen(false)
        } catch (err) {
            console.error('Logout failed:', err)
        }
    }

    const dropdown = (
        <div 
        className="bg-white rounded-xl shadow-shadow-strong min-w-[200px] py-2 z-100 mt-2 overflow-hidden" 
        ref={dropdownRef}
        style={{
            position: 'absolute',
            top: coords.top,
            right: coords.right,
        }}
        >
            {/* <div 
                className="
                    absolute top-[-2px] right-[20px]
                    w-0 h-0
                    border-l-8 border-l-transparent
                    border-r-8 border-r-transparent
                    border-b-8 border-white
                    z-[100]
                "
            ></div> */}
            {(isAuthenticated && loggedInUser) ? (<div className="flex flex-col rounded-lg py-2">
                <div className="
                    px-5 pt-3 pb-3 m-0
                    text-primary-dark
                    text-base
                    font-semibold
                ">
                    {`Hi ${loggedInUser?.fullname.split(' ')[0]}`} 
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
        {/* ) : (
            <div className="user-menu-content">
            <button
                className="menu-item"
                onClick={() => onOpenAuthModal('login')}
            >
                Log In
            </button>
            <button
                className="menu-item"
                onClick={() => onOpenAuthModal('signup')}
            >
                Sign Up
            </button>
            </div>
        )} */}
        </div>
  )
    return(
        <>
            <div className='app-header-container full sticky top-0 z-10 border-b border-primary-dark w-full min-w-[100dvw] h-[80px]'>
                <nav className='flex justify-between items-center w-full min-h-[80px] py-2'>            
                    <Link to='/' className='font-semibold rounded-[10px] text-primary-dark hover:text-secondary'>
                        <span>StyleSpire</span>
                    </Link>
                    <div className="flex justify-end items-center gap-8">
                        <NavLink to='/favorites' className='font-semibold rounded-[10px] text-primary-dark hover:text-secondary'>
                            Favorites
                        </NavLink>
                        <div className="flex relative gap-2">
                            <button className='bg-transparent rounded-2xl py-2 px-3 font-medium text-sm whitespace-nowrap' ref={buttonRef} onClick={toggleDropdown}>
                                {(isAuthenticated && loggedInUser) ? 
                                    <UserLetterCircle username='karin'/> :
                                    <ReactSVG src='/svgs/hamburger-icon.svg'/>
                                }
                            </button>
                        </div>
                    </div>
                    
                </nav>
            </div>
            {isDropdownOpen && 
                createPortal(
                    dropdown,
                    document.getElementById('portal-root') || document.body
                )
            }
        </>
    )
}
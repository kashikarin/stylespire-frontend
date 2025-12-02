import { useEffect, useState } from "react"
import { LoginFields } from "./LoginFields"
import { SignupFields } from "./SignupFields"
import { login, setAuthMode, signup } from '../store/actions/user.actions.js'
import { useSelector } from "react-redux"

export function AuthModal(){
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        fullname: '',
    })
    const authMode = useSelector(state => state.userModule.authMode)

    useEffect(() => {
        setError('') 
    }, [])
    
    function resetState() {
        setError('')
        setCredentials({
            email: '',
            password: '',
            fullname: '',
        })
    }

    function handleClose() {
        console.log("modal is closing!")
        resetState()
        setAuthMode(null)
    }

    function handleInputChange(ev) {
        const { name, value } = ev.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    function toggleMode() {
      setAuthMode(authMode === 'login' ? 'signup' : 'login')  
      resetState()
    }

    async function handleAuth(ev) {
        ev.preventDefault()
        setIsLoading(true)
        setError('')
        console.log('handleauth runs')
        try {
            let user
            if (authMode === 'signup') {
                user = await signup({
                    email: credentials.email,
                    password: credentials.password,
                    fullname: credentials.fullname,
                })
            } else {
                console.log('authmodal - login if runs')
                user = await login({
                    email: credentials.email,
                    password: credentials.password,
                })
            }

            handleClose()
        } catch (err) {
            console.error('Auth error:', err)
            setError(err.response?.data?.err || err.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            handleAuth()
        }
    }

    return(
        <>
            <div 
                className="
                    narrow:fixed narrow:inset-0 
                    narrow:bg-black/50
                    narrow:z-50 
                    narrow:backdrop-blur-sm
                    narrow:block hidden
                " 
                onClick={handleClose}
            
            />
            <div 
                className="
                    fixed inset-0 
                    bg-white 
                    max-w-none max-h-none w-full h-full 
                    flex flex-col justify-start items-stretch 
                    z-50
                    p-6
                    narrow:inset-auto
                    narrow:top-1/2 narrow:left-1/2
                    narrow:-translate-x-1/2 narrow:-translate-y-1/2 
                    narrow:scrollbar-none
                    narrow:z-50
                    narrow:w-[500px] narrow:h-auto narrow:max-h-[90svh]
                    narrow:rounded-xl
                    narrow:shadow-lg
                    // narrow:overflow-y-auto
                    narrow:p-0
                "
            >
                <div className="
                        flex-none
                        bg-white
                        rounded-xl
                        dir-ltr text-left
                        p-7
                        overflow-y-auto overscroll-contain 
                        border border-gray1
                        narrow:flex-initial
                        narrow:rounded-xl
                        narrow:relative  
                        narrow:modalSlideIn
                    "
                >
                    <button 
                        className="
                            hidden 
                            narrow:absolute narrow:top-1 narrow:right-1 
                            narrow:touch-none
                            narrow:bg-transparent
                            narrow:border-none
                            narrow:text-2xl
                            narrow:cursor-pointer
                            narrow:text-gray3
                            narrow:w-8 narrow:h-8
                            narrow:flex narrow:items-center narrow:justify-center
                            narrow:rounded-full
                            narrow:transition-all narrow:duration-300 narrow:ease-linear
                            narrow:hover:text-gray4 narrow:hover:bg-primary-bg
                        " 

                        
                        onClick={handleClose}
                    >
                        ×
                    </button>
                    <div>
                        <h2 
                            className='
                                text-center
                                mb-3
                                font-semibold
                                text-2xl
                                mobile:text-lg
                            '
                        >
                            {authMode === 'signup' ? 'Sign Up' : 'Log In'}
                        </h2>
                        {error && 
                            <div 
                                className="
                                    bg-surface
                                    py-3 px-4
                                    rounded-md
                                    border-green-surface
                                    text-sm
                                    text-primary-dark
                                    mb-5
                                    text-center
                                "
                            >
                                {error}
                            </div>
                        }

                        <form onSubmit={handleAuth} className="flex flex-col gap-3">
                            {authMode === 'login' ? 
                            <LoginFields 
                                credentials={credentials} 
                                isLoading={isLoading}
                                handleKeyDown={handleKeyDown}
                                onInputChange={handleInputChange}
                            /> :
                            <SignupFields 
                                credentials={credentials} 
                                handleKeyDown={handleKeyDown}
                                onInputChange={handleInputChange}
                                isLoading={isLoading}
                            />}
                            <button
                                type='submit'
                                className="
                                    bg-primary-dark
                                    text-white
                                    border-none
                                    py-3 px-5
                                    rounded-lg
                                    text-base
                                    font-semibold
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    mt-2
                                    mx-0
                                    hover:bg-green-surface
                                    disabled:bg-surface 
                                    disabled:cursor-not-allowed
                                    disabled:transform-none
                                "
                                disabled={isLoading}
                            >
                               {isLoading ? 'Loading...' : authMode === 'signup' ? 'Sign Up' : 'Log In'}
                            </button>
                            </form>
                            <div className="
                                    text-center 
                                    mt-5
                                    pt-5
                                    border-t-border
                                ">
                                <span className="text-gray3 text-sm">
                                    {authMode === 'signup'
                                        ? 'Already have an account? '
                                        : "Don't have an account? "}
                                    <button
                                        className="
                                            bg-transparent
                                            border-none
                                            text-primary-dark
                                            cursor-pointer
                                            text-sm
                                            undeline
                                            font-semibold
                                            hover:text-text
                                            disabled:text-gray1 disabled:cursor-not-allowed
                                            focus:outline-text outline-offset-2
                                        "
                                        onClick={toggleMode}
                                        disabled={isLoading}
                                    >
                                        {authMode === 'signup' ? 'Log In' : 'Sign Up'}
                                    </button>
                                </span>
                            </div>
                    </div>
                    </div>
                </div>
                </>
    )
}
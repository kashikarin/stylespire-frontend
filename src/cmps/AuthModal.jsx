import { LoginFields } from "./LoginFields"
import { SignupFields } from "./SignupFields"
import { useAuthForm } from "../hooks/useAuthForm"
import { useEffect, useRef } from "react"

export function AuthModal(){
    const emailRef = useRef(null)
    const contentRef = useRef(null)
    const { onClose, 
        credentials,
        toggleMode,
        submitAuth, 
        authMode, 
        isLoading, 
        onInputChange, 
        error 
    } = useAuthForm()

    useEffect(() => {
      emailRef.current?.focus()
    }, [])

    useEffect(() => {
        if (error) {
            contentRef.current?.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }, [error])

    return(
        <>
            <div 
                className="
                    narrow:fixed narrow:inset-0 
                    narrow:bg-black/50
                    narrow:z-40 
                    narrow:backdrop-blur-sm
                    narrow:block hidden
                " 
                onClick={onClose}
            
            />
            <div 
                className="
                    fixed inset-0 
                    bg-white 
                    max-w-none max-h-none w-full h-full 
                    flex flex-col justify-start items-stretch 
                    z-10
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
                <div
                    ref={contentRef} 
                    className="
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
                        onClick={onClose}
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

                        <form onSubmit={submitAuth} className="flex flex-col gap-3">
                            {authMode === 'login' ? 
                            <LoginFields 
                                emailRef={emailRef}
                                credentials={credentials} 
                                isLoading={isLoading}
                                onInputChange={onInputChange}
                            /> :
                            <SignupFields 
                                emailRef={emailRef}
                                credentials={credentials} 
                                onInputChange={onInputChange}
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
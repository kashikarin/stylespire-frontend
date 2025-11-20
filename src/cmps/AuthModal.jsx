import { useEffect, useState } from "react"
import { LoginFields } from "./LoginFields"
import { SignupFields } from "./SignupFields"
import { login, setAuthMode, signup } from '../store/actions/user.actions.js'
import { useSelector } from "react-redux"

export function AuthModal(){
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
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

    async function handleAuth() {
        setIsLoading(true)
        setError('')

        try {
            let user
            if (authMode === 'signup') {
                user = await signup({
                    email: credentials.email,
                    password: credentials.password,
                    fullname: credentials.fullname,
                })
            } else {
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

    // useEffect(() => {
    //   const loadGoogleScript = () => {
    //     return new Promise((resolve, reject) => {
    //       if (window.google) {
    //         resolve(window.google)
    //         return
    //       }
  
    //       const existingScript = document.querySelector(
    //         'script[src*="gsi/client"]'
    //       )
    //       if (existingScript) {
    //         existingScript.onload = () => resolve(window.google)
    //         existingScript.onerror = reject
    //         return
    //       }
  
    //       const script = document.createElement('script')
    //       script.src = 'https://accounts.google.com/gsi/client'
    //       script.async = true
    //       script.defer = true
    //       script.onload = () => {
    //         resolve(window.google)
    //       }
    //       script.onerror = () => {
    //         reject(new Error('Failed to load Google SDK'))
    //       }
  
    //       document.head.appendChild(script)
    //     })
    //   }
  
    //   const initGoogleAuth = async () => {
    //     try {
    //       await loadGoogleScript()
  
    //       const waitForGoogle = () => {
    //         return new Promise((resolve) => {
    //           if (window.google?.accounts?.id) {
    //             resolve()
    //           } else {
    //             setTimeout(() => waitForGoogle().then(resolve), 100)
    //           }
    //         })
    //       }
  
    //       await waitForGoogle()
  
    //       window.google.accounts.id.initialize({
    //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //         callback: handleGoogleCallback,
    //         auto_select: false,
    //         cancel_on_tap_outside: true,
    //         use_fedcm_for_prompt: false,
    //         itp_support: true,
    //       })
  
    //       if (authMode === 'login') {
    //         setTimeout(() => {
    //           const container = document.getElementById('google-signin-button')
    //           if (container) {
    //             container.innerHTML = ''
    //             window.google.accounts.id.renderButton(container, {
    //               theme: 'outline',
    //               size: 'large',
    //               width: '100%',
    //               text: 'continue_with',
    //               type: 'standard',
    //             })
    //           }
    //         }, 100)
    //       }
    //     } catch (error) {
    //         console.error(error)
    //     }
    //   }
  
    //   initGoogleAuth()
    // }, [authMode])

    async function handleImageSelect(event) {
        const file = event.target.files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file only')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image too large. Maximum 5MB')
            return
        }

        setIsUploadingImage(true)
        setError('')

        try {
            const imgData = await uploadService.uploadImg(file)

            if (imgData?.secure_url) {
                setCredentials((prev) => ({
                ...prev,
                imageUrl: imgData.secure_url,
                }))
                console.log('Image uploaded:', imgData.secure_url)
            } else {
                throw new Error('Failed to get image URL')
            }
        } catch (err) {
            console.error('Image upload error:', err)
            setError('Failed to upload image. Please try again')
        } finally {
            setIsUploadingImage(false)
        }
    }

    return(
        <>
            <div 
                className="
                    none 
                    narrow:fixed narrow:inset-0 
                    narrow:bg-black 
                    narrow:opacity-50 
                    narrow:z-50 
                    narrow:backdrop-blur-sm
                " 
                onClick={handleClose}
            />
            <div 
                className="
                    fixed inset-0 
                    transform-none 
                    bg-white 
                    height-[100svh] max-w-none max-h-none w-full 
                    p-6 
                    flex flex-col justify-start items-stretch 
                    overflow-y-auto overscroll-contain z-50
                    narrow:top-1/2 narrow:left-1/2
                    narrow:-translate-x-1/2 narrow:-translate-y-1/2 
                    narrow:scrollbar-none
                    narrow:z-50
                    narrow:max-w-[500px] narrow:w-9/10 narrow:max-h-[90svh]
                "
            >                                                                                                               scrollbar-width: none;
                <div className="
                        flex-none
                        bg-white
                        rounded-lg
                        dir-ltr text-left
                        border-gray2
                        narrow:flex-initial
                        narrow:rounded-xl
                        narrow:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                        narrow:relative  
                        narrow:p-7
                        narrow:modalSlideIn
                    "
                >
                    <button 
                        className="
                            hidden 
                            narrow:absolute narrow:top-4 narrow:right-4 
                            narrow:bg-none
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
                                mb-6
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

                        <div className="flex flex-col gap-5">
                            {authMode === 'login' ? 
                            <LoginFields 
                                credentials={credentials} 
                                isLoading={isLoading}
                                handleKeyDown={handleKeyDown}
                                onInputChange={handleInputChange}
                            /> :
                            <SignupFields 
                                credentials={credentials} 
                                isUploadingImage={isUploadingImage} 
                                onImageSelect={handleImageSelect}
                                handleKeyDown={handleKeyDown}
                                onInputChange={handleInputChange}
                                isLoading={isLoading}
                            />}
                            <button
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
                                    ease-linear
                                    mt-2
                                    mx-0
                                    hover:bg-primary-dark
                                    hover:translate-y-[-1px]
                                    disabled:bg-surface 
                                    disabled:cursor-not-allowed
                                    disabled:transform-none
                                "
                                onClick={handleAuth}
                                disabled={isLoading || isUploadingImage}
                            >
                               {isLoading ? 'Loading...' : authMode === 'signup' ? 'Sign Up' : 'Log In'}
                            </button>
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
                                            bg-none
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
                </div>
                </>
    )
}
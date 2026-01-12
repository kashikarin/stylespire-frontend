import { useState } from "react"
import { useSelector } from "react-redux"
import { login, setAuthMode, signup, startDemoSession } from '../store/actions/user.actions.js'

export function useAuthForm(){
    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        fullname: '',
    })
    const authMode = useSelector(state => state.userModule.authMode)
    const isLoading = useSelector(state => state.userModule.isLoading)
    
    function resetState() {
        setError('')
        setCredentials({
            email: '',
            password: '',
            fullname: '',
        })
    }

    function onClose(){
        setAuthMode(null)
        resetState()
    }

    function onInputChange(ev) {
        const { name, value } = ev.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    function toggleMode() {
      setAuthMode(authMode === 'login' ? 'signup' : 'login')  
      resetState()
      setError('')
    }

    async function submitAuth(e) {
        e.preventDefault()
        setError('')

        try {
            const action = authMode === 'signup' ? signup : login
            const payload = authMode === 'signup' ? credentials : {
                email: credentials.email,
                password: credentials.password,
            }
            await action(payload)
            onClose()
        } catch (err) {
            console.error('Auth error:', err)
            setError(err.response?.data?.err || err.message || 'Something went wrong')
        }
    }

    async function onLoginDemo(){
        try{
            await startDemoSession()
            onClose()
        } catch(err){
            console.error('Demo session error:', err)
            setError(err.response?.data?.err || err.message || 'Something went wrong')
        }
    }
    
    return{
        onClose,
        onInputChange,
        toggleMode,
        submitAuth,
        isLoading,
        authMode,
        error,
        credentials,
        onLoginDemo
    }
}
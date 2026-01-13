import { useState } from 'react'
import { startDemoSession } from '../store/actions/user.actions.js'

export function useDemoLogin(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function onLoginDemo(){
        if (isLoading) return

        setIsLoading(true)
        setError(null)

        try{
            await startDemoSession()
        } catch(err){
            console.error('Demo session error:', err)
            setError('Demo is temporarily unavailable')
        } finally{
            setIsLoading(false)
        }
    }
    
    return{
        onLoginDemo,
        isLoading,
        error
    }
}

    

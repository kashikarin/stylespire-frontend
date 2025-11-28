import { AppHeader } from "./cmps/AppHeader"
import { Favorites } from "./pages/Favorites"
import { Home } from "./pages/Home"
import { Routes, Route } from 'react-router'
import { Results } from "./pages/Results"
import { useSelector } from "react-redux"
import { AuthModal } from "./cmps/AuthModal"
import { useEffect } from "react"
import { getUserOnRefresh } from "./store/actions/user.actions"

export function RootCmp(){
    const authMode = useSelector(state => state.userModule.authMode)
    
    useEffect(()=>{
        getUserOnRefresh()
    }, [])

    return(
        <>
            <div className='main-container'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="" element={<Home />}/>
                        <Route path='favorites' element={<Favorites /> }/>
                        <Route path='results' element={<Results />}/>
                    </Routes>
                </main>            
            </div>
            {authMode && <AuthModal />}
        </>
        
    )
}
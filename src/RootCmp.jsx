import { AppHeader } from "./cmps/AppHeader"
import { Favorites } from "./pages/Favorites"
import { Home } from "./pages/Home"
import { Routes, Route } from 'react-router'
import { Results } from "./pages/Results"
import { useSelector } from "react-redux"
import { AuthModal } from "./cmps/AuthModal"
import { useEffect } from "react"
import { getUserOnRefresh } from "./store/actions/user.actions"
import { breakpoints } from "./util/breakpoints"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { AppFooter } from "./cmps/AppFooter"

export function RootCmp(){
    const authMode = useSelector(state => state.userModule.authMode)
    const isMobile = useMediaQuery(breakpoints.mobile)
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
            {isMobile && <AppFooter />}
            {authMode && <AuthModal />}
        </>
        
    )
}
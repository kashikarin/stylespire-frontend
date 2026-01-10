import { AppHeader } from "./cmps/AppHeader"
import { Favorites } from "./pages/Favorites"
import { Home } from "./pages/Home"
import { Routes, Route, useLocation } from 'react-router'
import { Results } from "./pages/Results"
import { useSelector } from "react-redux"
import { AuthModal } from "./cmps/AuthModal"
import { breakpoints } from "./util/breakpoints"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { AppFooter } from "./cmps/AppFooter"
import { StyleMeModal } from "./cmps/StyleMeModal"
import { motion, AnimatePresence } from "framer-motion"
import { StyleBoard } from "./pages/StyleBoard"
import { useCurrentUser } from "./hooks/useCurrentUser"
import { ProtectedRoute } from "./cmps/ProtectedRoute"
import { useIsLoggedInUser } from "./hooks/useIsLoggedInUser"

export function RootCmp(){
    const location = useLocation()
    const { loggedInUser, loading } = useIsLoggedInUser()
    const authMode = useSelector(state => state.userModule.authMode)
    const isStyleMeModalOpen = useSelector(state => state.systemModule.isStyleMeModalOpen)
    const isMobile = useMediaQuery(breakpoints.mobile)
    const isStyleBoard = location.pathname === '/board' && loggedInUser
    
    useCurrentUser()

    if (loading) return null

    return(
        <>
            <div className={`main-container ${isStyleBoard ? 'no-main-layout' : ''}`}>
                <AppHeader />
                {isStyleBoard ? (
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route path='board' element={<StyleBoard />} />
                        </Route>
                    </Routes>
                ) :
                (
                    <main>
                        <Routes>
                            <Route path="" element={<Home />}/>
                            {/* <Route path='favorites' element={<Favorites /> }/> */}
                            <Route path='results' element={<Results />}/>
                            <Route element={<ProtectedRoute />}>
                                <Route path='board' element={<StyleBoard />} />
                                <Route path='favorites' element={<Favorites />} />
                            </Route>
                        </Routes>
                    </main>
                )}
            </div>
            {isMobile && <AppFooter />}
            {authMode && <AuthModal />}
            <AnimatePresence>
                {isStyleMeModalOpen && 
                    <motion.div
                        className="
                            fixed inset-0 
                            bg-black/40 backdrop-blur-sm 
                            flex items-center justify-center 
                            p-4 
                            z-50
                        "
                        initial={{ opacity: 0 }}
                        animate={{opacity: 1 }}
                        exit={{  opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <StyleMeModal />
                    </motion.div>}
            </AnimatePresence>
            
        </>
        
    )
}


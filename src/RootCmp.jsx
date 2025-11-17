import { AppHeader } from "./cmps/AppHeader"
import { Favorites } from "./pages/Favorites"
import { Home } from "./pages/Home"
import { Routes, Route } from 'react-router'
import { Results } from "./pages/Results"

export function RootCmp(){
    return(
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
    )
}
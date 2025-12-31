import { FavoritesGrid } from "../cmps/Favorites/FavoritesGrid"
import { useFavorites } from "../hooks/useFavorites"
import { ImageModal } from '../cmps/Favorites/ImageModal'  
import { useLike } from "../hooks/useLike"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"

export function Favorites(){
    const { favorites, 
            handleSelect, 
            selectedFav, 
            resetSelectedFav 
        } = useFavorites()  
    const { isLoggedInUser } = useIsLoggedInUser()  
    const { getIsLiked, toggleLike } = useLike()
    
    if (!isLoggedInUser) return null
    
    return(
        <section 
            className='
                bg-primary-bg 
                min-h-[100dvh]
            '
        >
            <header 
                className='
                mb-8
                animate-fadeIn
                '
                >
                <h1 
                    className="
                        text-2xl 
                        narrow:text-3xl 
                        font-bold 
                        text-primary-dark
                        tracking-tight
                    "
                    >
                    Your Inspiration Board
                </h1>
                    
                {favorites.length ? <p 
                    className='
                        text-gray3 
                        mt-1 
                        text-sm 
                        narrow:text-base
                    '
                >
                    Items curated by you
                </p> :
                <p 
                    className='
                        text-gray3 
                        mt-1 
                        text-sm 
                        narrow:text-base
                    '
                >
                    Save looks you love, and they’ll show up here — ready to inspire you anytime
                </p>
                } 
            </header>
                <FavoritesGrid 
                    favorites={favorites} 
                    onSelect={handleSelect} 
                    onLike={toggleLike} 
                    getIsLiked={getIsLiked} 
                    isLoggedInUser={isLoggedInUser}
                />
            <ImageModal selectedFav={selectedFav} onClose={resetSelectedFav}/>
        </section>
    )
}
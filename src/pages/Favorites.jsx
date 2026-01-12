import { FavoritesGrid } from "../cmps/Favorites/FavoritesGrid"
import { useFavorites } from "../hooks/useFavorites"
import { ImageModal } from '../cmps/Favorites/ImageModal'  
import { useLike } from "../hooks/useLike"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { StyleboardHintBlob } from "../cmps/Favorites/StyleBoardHintBlob"

export function Favorites(){
    const { favorites, 
            handleSelect, 
            selectedFav, 
            resetSelectedFav 
        } = useFavorites()  
    const { isLoggedInUser } = useIsLoggedInUser()  
    const { getIsLiked, toggleLike } = useLike()
    const hasFavorites = favorites.length > 0

    if (!isLoggedInUser) return null

    return(
        <section 
            className='
                bg-primary-bg 
                min-h-[100svh]
            '
        >
            <header 
                className='
                    mb-5
                    animate-fadeIn
                    flex
                    items-start
                    justify-between
                    gap-6
                '
            >
                <div className='flex flex-col '>
                    <h1 
                        className="
                            text-2xl 
                            narrow:text-3xl 
                            font-bold 
                            text-primary-dark
                            tracking-tight
                        "
                    >
                        Saved Outfit Inspirations
                    </h1>
                        
                    <p className='text-gray3 mt-1 text-sm narrow:text-base'>
                        {hasFavorites ?
                            'A personal collection of looks you can revisit and refine' :
                            'Save looks you love to build your personal style collection'
                        }
                    </p>
                </div>    
                <div
                    className="
                        flex-shrink-0
                        translate-y-[6px]
                        hidden
                        narrow:block
                    "
                >
                    <StyleboardHintBlob />
                </div>       
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
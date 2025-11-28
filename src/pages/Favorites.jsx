import { FavoritesGrid } from "../cmps/Favorites/FavoritesGrid"
import { useFavorites } from "../hooks/useFavorites"
import { ImageModal } from '../cmps/Favorites/ImageModal'  

export function Favorites(){
    const { favorites, 
            handleSelect, 
            selectedFav, 
            resetSelectedFav 
        } = useFavorites()    

    function onClose(){

    }

    return(
        <section 
            className='
                py-5 px-6 
                bg-primary-bg 
                min-h-[100dvh]
            '
        >
            <header 
                className='
                    mb-8 px-2 
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
                <p 
                    clasName='
                        text-gray3 
                        mt-1 
                        text-sm 
                        narrow:text-base
                    '
                >
                    items curated by you
                </p>
            </header>
            <FavoritesGrid favorites={favorites} onSelect={handleSelect}/>
            <ImageModal selectedFav={selectedFav} onClose={resetSelectedFav}/>
        </section>
    )
}
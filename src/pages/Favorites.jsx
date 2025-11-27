import { section } from "framer-motion/client"
import { useState } from "react"
import { useSelector } from "react-redux"

export function Favorites(){
    const favorites = useSelector(state => state.favoriteModule.favorites)
    const [selectedFav, setSelectedFav] = useState(null)

    function handleSelect(image){
        setSelectedFav(image)
    } 

    function onClose(){

    }

    return(
        <section className='py-5 px-6 bg-primary-bg min-h-[100dvh]'>
            <h1 className="font-playfair text-[clamp(1.6rem, 2.2vw, 2.4rem)] font-bold text-primary-dark mb-6">Favorites</h1>
            <FavoritesGrid favorites={favorites} onSelect={handleSelect}/>
            <ImageModal selectedFav={selectedFav} onClose={() => setSelectedFav(null)}/>
        </section>
    )
}
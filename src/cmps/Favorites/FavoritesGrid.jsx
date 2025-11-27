import { article } from "framer-motion/client";

export function FavoritesGrid({ favorites, onSelect }){
    return(
        <article className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4'>
            {favorites.map((fav, i) => <FavoriteItem key={photo.id} image={image} onClick={() => onSelect(image)} />)}
        </article>
    )
}
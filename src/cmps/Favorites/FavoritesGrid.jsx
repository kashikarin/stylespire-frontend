import { FavoriteItem } from "./FavoritesItem"

export function FavoritesGrid({ favorites, onSelect }){
    console.log("🚀 ~ favorites:", favorites)
    return(
        <article 
            className='
                columns-1 
                narrow:columns-2 
                normal:columns-3 
                wide:columns-4 
                gap-4 
                py-4'
            >
            {favorites.map(fav => <FavoriteItem key={fav._id} favorite={fav} onSelect={()=> onSelect(fav)} />)}
        </article>
    )
}
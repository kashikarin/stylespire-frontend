import { FavoriteItem } from "./FavoritesItem"

export function FavoritesGrid({ favorites, onSelect, onLike, getIsLiked, isLoggedInUser }){
    console.log("🚀 ~ favorites:", favorites)
    return(
        <article 
            className='
                columns-2 
                narrow:columns-3 
                normal:columns-4 
                wide:columns-6 
                gap-4 
                py-4'
            >
            {favorites.map(fav => <FavoriteItem 
                key={fav._id} 
                favorite={fav} 
                onSelect={()=> onSelect(fav)}
                onLike={onLike}
                isLiked={getIsLiked(fav.image.id)}
                isLoggedInUser={isLoggedInUser}
            />)}
        </article>
    )
}
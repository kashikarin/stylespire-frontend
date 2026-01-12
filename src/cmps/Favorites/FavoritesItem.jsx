import { LikeIcon } from "../LikeIcon"

export function FavoriteItem({ 
    favorite, 
    onSelect,
    isLoggedInUser
}){
    const image = {
        id: favorite.image.id,
        url: favorite.image.url,
        description: favorite.image.description
    }
    
    function handleSelectFav(ev, favorite) {
        ev.stopPropagation()
        onSelect(favorite)
    }

    return(
        <div 
            className="
                relative
                group
                mb-4 
                break-inside-avoid 
                block 
                cursor-pointer 
                rounded-xl 
                overflow-hidden 
                shadow-shadow-soft
                hover:shadow-shadow-hover
                hover:-translate-y-[2px]
                transition-all duration-300
            " 
            onClick={(ev) =>handleSelectFav(ev, favorite)}
        >
            <div 
                className="
                    absolute
                    w-full
                    text-white
                    p-2 rounded full
                    top-0 right-3 
                    flex justify-end 
                    z-[100]
                    opacity-0 
                    transition-opacity duration-300
                    group-hover:opacity-90
                "
            >
                {isLoggedInUser && <LikeIcon image={image} />}    
            </div>
            <img src={favorite.image.url} className="w-full object-cover" loading="lazy"/>
        </div>
    )
}
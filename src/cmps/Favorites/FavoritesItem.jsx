export function FavoriteItem({ favorite, onSelect }){
    console.log("🚀 ~ fav:", favorite)
    
    function handleSelectFav(ev, favorite) {
        ev.stopPropagation()
        onSelect(favorite)
    }
    return(
        <div 
            className="
                mb-4 
                break-inside-avoid block 
                cursor-pointer 
                rounded-xl 
                overflow-hidden 
                shadow-shadow-soft
                hover:shadow-shadow-hover
                hover:-translate-y-1
                transition-all duration-300
            " 
            onClick={(ev) =>handleSelectFav(ev, favorite)}
        >
            <img src={favorite.image.url} className="w-full object-cover"/>
        </div>
    )
}
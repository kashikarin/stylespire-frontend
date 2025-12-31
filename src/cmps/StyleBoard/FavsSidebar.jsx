export function FavsSidebar({favorites}){
    return(
        <div className="space-y-3 mx-auto">
            {favorites.map(fav => (
                <div 
                    key={fav._id}
                    className="w-full aspect-square rounded-md overflow-hidden"
                >
                    <img 
                        src={fav.image.url} 
                        alt={fav.image.description} 
                        className="w-full h-full object-cover"
                        draggable
                        onDragStart={e => {
                            e.dataTransfer.setData('image-src', fav.image.url)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
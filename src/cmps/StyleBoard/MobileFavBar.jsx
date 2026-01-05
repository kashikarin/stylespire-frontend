export function MobileFavBar({ favorites, onItemSelect }){
    return(
        <div 
            className="
                fixed left-0 right-0 bottom-[4rem]
                border-t border-primary-dark 
                bg-primary-bg 
                p-2
            "
        >
            <div 
                className='
                    flex gap-3
                    overflow-y-auto
                    snap-x snap-mandatory
                    scrollbar-none

                '
            >
                {favorites.map(fav => (
                    <div 
                        key={fav._id} 
                        className="
                            shrink-0
                            snap-start
                            w-[100px] h-[130px]
                            rounded-md
                            overflow-hidden
                            
                        "
                        onClick={() => onItemSelect(fav.image.url)}
                    >
                            <img 
                                src={fav.image.url} 
                                alt={fav.image.description} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                ) 

                )}
            
            </div>
        </div>
    )
}
import { ReactSVG } from "react-svg"
import { useBackgroundRemoval } from "../../hooks/useBackgroundRemoval"
import { FavProcessingOverlay } from "./FavProcessingOverlay"

export function MobileFavBar({ favorites, onItemSelect }){
    const {
        getProcessedImage,
        processingIds,
        failedIds
    } = useBackgroundRemoval(favorites)

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
                {favorites.map(fav => {
                    const processedImage = getProcessedImage(fav._id)
                    const isProcessed = Boolean(processedImage)
                    const isProcessing = processingIds.has(fav._id)
                    const isFailed = failedIds.has(fav._id)

                    return (
                        <div 
                            key={fav._id} 
                            className="
                                relative
                                shrink-0
                                snap-start
                                w-[75px] h-[75px]
                                rounded-md
                                overflow-hidden
                            "
                            onClick={isProcessed ? () => onItemSelect(processedImage) : undefined}
                        >
                                <img 
                                    src={fav.image.url} 
                                    alt={fav.image.description} 
                                    className="w-full h-full object-cover"
                                />
                                {!isProcessed && <FavProcessingOverlay 
                                        isProcessing={isProcessing}
                                        isFailed={isFailed}
                                        variant="mobile"
                                    />
                                }
                            </div>
                    ) 
                }
                

                )}
            
            </div>
        </div>
    )
}
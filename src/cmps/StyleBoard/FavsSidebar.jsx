import { useBackgroundRemoval } from "../../hooks/useBackgroundRemoval"
import { FavProcessingOverlay } from "./FavProcessingOverlay"

export function FavsSidebar({favorites}){
    const {
        getProcessedImage,
        processingIds,
        failedIds
    } = useBackgroundRemoval(favorites)

    return(
        <div className="space-y-3 mx-auto">
            {favorites.map(fav => {
                const processedImage = getProcessedImage(fav._id)
                const isProcessed = Boolean(processedImage)
                const isProcessing = processingIds.has(fav._id)
                const isFailed = failedIds.has(fav._id)

                return (
                    <div 
                        key={fav._id}
                        className="relative w-full aspect-square rounded-md overflow-hidden"
                    >
                        <img 
                            src={fav.image.url} 
                            alt={fav.image.description} 
                            className={`w-full h-full object-cover transition-opacity
                                ${!isProcessed ? 'opacity-70' : ''}
                            `}
                            draggable={isProcessed}
                            onDragStart={e => {
                                if (!isProcessed) {
                                    e.preventDefault()
                                    return
                                }
                                e.dataTransfer.setData('image-src', processedImage)

                                const img = e.currentTarget
                                e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2)
                            }}
                        />
                        {!isProcessed && <FavProcessingOverlay 
                            isProcessing={isProcessing}
                            isFailed={isFailed}

                        />}
                    </div>)
            }   
            )}
        </div>
    )
}
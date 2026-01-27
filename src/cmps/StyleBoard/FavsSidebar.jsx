import { useBackgroundRemoval } from "../../hooks/useBackgroundRemoval"

export function FavsSidebar({favorites}){
    const { getProcessedImage, processingIds, failedIds } = useBackgroundRemoval(favorites)

    return(
        <div className="space-y-3 mx-auto">
            {favorites.map(fav => {
                const processedImage = getProcessedImage(fav._id)
                const isProcessed = Boolean(processedImage)
                const isProcessing = processingIds.has(fav._id)
                const isFailed = failedIds.has(fav._id)
                const imgSrc = processedImage || fav.image.url

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
                                if (!isProcessed) return
                                e.dataTransfer.setData('image-src', imgSrc)

                                const img = e.currentTarget
                                e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2)
                            }}
                        />
                        {!isProcessed && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium">
                                {isProcessing && 'Processing image...'}
                                {!isProcessing && !isFailed && 'Pending processing'}
                                {isFailed && 'Processing failed'}
                            </div>
                        )}
                    </div>)
            }   
            )}
        </div>
    )
}
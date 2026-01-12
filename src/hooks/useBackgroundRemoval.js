import { useEffect, useState, useRef } from "react"
import { backgroundRemovalService } from "../services/backgroundRemoval.service"

export function useBackgroundRemoval(favorites) {
    const processedImagesRef = useRef(new Map()) 
    const processingRef = useRef(new Set())

    const [processingIds, setProcessingIds] = useState(new Set())
    const [failedIds, setFailedIds] = useState(new Set())

    useEffect(() => {
        if (!Array.isArray(favorites) || !favorites.length) return

        let cancelled = false

        async function preLoad(){
            for (const fav of favorites) {
                if (cancelled) break

                if (processedImagesRef.current.has(fav._id) || 
                    processingRef.current.has(fav._id) || 
                    failedIds.has(fav._id)
                ) {
                    continue
                }

                // skip and mark as failed if image URL is missing
                if (!fav?.image?.url) {
                    setFailedIds(prev => {
                        const next = new Set(prev)
                        next.add(fav._id)
                        return next
                    })
                    continue
                }

                processingRef.current.add(fav._id)
                setProcessingIds(prev => {
                    const next = new Set(prev)
                    next.add(fav._id)
                    return next
                })

                try {
                    const processedImageUrl = await backgroundRemovalService.removeBackgroundFromImage(fav.image.url)
                    if (cancelled) return
                    processedImagesRef.current.set(fav._id, processedImageUrl)
                } catch (err) {
                    console.warn('Preload failed', err)
                    setFailedIds(prev => {
                        const next = new Set(prev)
                        next.add(fav._id)
                        return next
                    })
                } finally {
                    processingRef.current.delete(fav._id)
                    setProcessingIds(prev => {
                        const next = new Set(prev)
                        next.delete(fav._id)
                        return next
                    })
                }
            }   
        }    
        
        preLoad()

        return () => cancelled = true           
    },[favorites, failedIds])
    
    return {
        getProcessedImage: (favId) => processedImagesRef.current.get(favId) || null,
        processingIds,
        failedIds
    }
}

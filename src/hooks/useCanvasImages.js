import { useState } from 'react'
import { useEffect } from 'react'
import { normalizeImageSrc } from '../services/image.util.js'

export function useCanvasImages(items, background){
useEffect(() => {
  console.log('API BASE:', import.meta.env.VITE_API_BASE_URL)
}, [])
    const [imagesById, setImagesById] = useState({})
    const [backgroundImage, setBackgroundImage] = useState(null)

    useEffect(() => {
        items?.forEach(item => {
            if (!item?.id || !item?.src) return
            if (imagesById[item.id]) return

            const fullSrc = normalizeImageSrc(item.src)

            const img = new window.Image()
            img.src = fullSrc

            img.onload = () => setImagesById(prev => ({
                ...prev,
                [item.id]: img 
            }))

            img.onerror = () => console.warn('Failed to load image:', fullSrc)
        })
        
    }, [items, imagesById])


    useEffect(() => {
        if (!background) return

        const img = new window.Image()
        img.src = background

        img.onload = ()=>setBackgroundImage(img)
    }, [background])


    return { imagesById, backgroundImage }
}
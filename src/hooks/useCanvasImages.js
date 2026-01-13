import { useState } from 'react'
import { useEffect } from 'react'
import { buildImageUrl } from '../services/board.service.js'

export function useCanvasImages(items, background){
    const [imagesBySrc, setImagesBySrc] = useState({})
    const [backgroundImage, setBackgroundImage] = useState(null)

    useEffect(() => {
        items?.forEach(item => {
            if (!item?.src) return
            if (imagesBySrc[item.src]) return

            const img = new window.Image()
            img.src = buildImageUrl(item.src)

            img.onload = () => setImagesBySrc(prev => ({
                ...prev,
                [item.src]: img 
            }))
        })
        
    }, [items, imagesBySrc])


    useEffect(() => {
        if (!background) return

        const img = new window.Image()
        img.src = background
        
        img.onload = ()=>setBackgroundImage(img)
    }, [background])


    return { imagesBySrc, backgroundImage }
}
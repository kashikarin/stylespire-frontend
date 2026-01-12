import { useEffect, useState } from "react"
import { DEFAULT_BACKGROUNDS } from "../util/backgrounds"

export function useCanvasBackgrounds({
    initialQuery = "soft background style inspiration", 
    perPage = 10
}) {
    
    const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_KEY

    const [backgrounds, setBackgrounds] = useState(DEFAULT_BACKGROUNDS)    
    const [query, setQuery] = useState(initialQuery)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setPage(1)
        fetchBackgrounds(1)
    }, [query])

    async function fetchBackgrounds(pageToFetch = 1){
        setError(null)
        setLoading(true)
        try {
            const url= `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${pageToFetch}`
            const res =  await fetch(url, { headers: 
                {
                    Authorization: PEXELS_API_KEY 
                }
            })

            if (!res.ok) throw new Error("Failed to fetch backgrounds")
            const data = await res.json()

            const newBgs = data.photos.map(photo => photo.src.large)

            if (pageToFetch === 1) setBackgrounds([...DEFAULT_BACKGROUNDS, ...newBgs])
            else setBackgrounds(prev => [...prev, ...newBgs])

            setPage(pageToFetch)

        } catch(err) {
            setError(err.message)
            console.error('Failed to fetch backgrounds', err)   
        } finally {
            setLoading(false)
        }
    }
    
    function loadMoreBackgrounds(){
        fetchBackgrounds(page + 1)
    }

    return {
        backgrounds,
        loading,
        error,
        loadMoreBackgrounds,
    }   
}
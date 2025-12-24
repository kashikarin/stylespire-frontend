import { useEffect, useState } from "react"

export function useCanvasBackgrounds({
    initialQuery = "soft background style inspiration", 
    perPage = 10,
    selectedBackground,
    onBackgroundChange
}
) {
    
    const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_KEY

    const initialBgs = [
        '/imgs/bgs/clean.jpg',
        '/imgs/bgs/unique.jpg',
        '/imgs/bgs/futuristic.jpg',
        '/imgs/bgs/graffity.jpg',
        '/imgs/bgs/marble.jpg',
        '/imgs/bgs/studio.jpg',
        '/imgs/bgs/ladder.jpg',
        '/imgs/bgs/vintagewall.jpg',
        '/imgs/bgs/nybricks.jpg',
        '/imgs/bgs/graffity2.jpg'
    ]

    const [backgrounds, setBackgrounds] = useState(initialBgs)    
    const [query, setQuery] = useState(initialQuery)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setPage(1)
        fetchBackgrounds()
    }, [query])

    async function fetchBackgrounds(pageToFetch = 1){
        setError(null)
        setLoading(true)
        try {
            const url= `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${pageToFetch}`
            console.log("🚀 ~ fetchBackgrounds ~ url:", url)
            const res =  await fetch(url, { headers: 
                {
                    Authorization: PEXELS_API_KEY 
                }
            })

            if (!res.ok) throw new Error("Failed to fetch backgrounds")
            const data = await res.json()

            const newBgs = data.photos.map(photo => photo.src.large)

            if (pageToFetch === 1) setBackgrounds([...initialBgs, ...newBgs])
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
        const nextPage = page + 1
        setPage(nextPage)
        fetchBackgrounds(nextPage)
    }

    function selectBackground(bg) { 
        console.log('selectBackground runs')             
        onBackgroundChange(bg)
    }

    return {
        backgrounds,
        loading,
        error,
        loadMoreBackgrounds,
        selectedBackground,
        selectBackground
    }   
}
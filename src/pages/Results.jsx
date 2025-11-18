import { useLocation } from "react-router-dom"
import { searchUnsplash } from "../services/unsplash.service"
import { useEffect, useState } from "react"

export function Results() {
    const location = useLocation()
    const [images, setImages] = useState(location.state.results)


    if (!images) return <h3>Sorry, no result...</h3>
    
    return(
        <section className="flex flex-col gap-4">
            <h3 className="text-primary-dark">AI picks for you</h3>
            <div className="grid grid-cols-2 gap-4 p-4">
                {images.map(img => (
                    <div key={img.id} className="relative">
                    <img src={img.urls.small} className="rounded-xl shadow-sm" />
                    </div>
                ))}
            </div>
        </section>
        
    )
}
import { useLocation } from "react-router-dom"
import { searchUnsplash } from "../services/unsplash.service"
import { useEffect, useRef, useState } from "react"

export function Results() {
    const location = useLocation()
    const [images, setImages] = useState(location.state.results)
    const imgContainerRef = useRef()

    if (!images) return <h3>Sorry, no result...</h3>
    
    return(
        <section className="flex flex-col gap-4 w-full">
            <h3 className="text-primary-dark">AI picks for you</h3>
            <div className="w-full max-w-[100vw] overflow-hidden hover:opacity-100 hover:visible" ref={imgContainerRef.current}>
                <div className="w-full max-w-full overflow-visible z-2 pointer-events-none">
                    <div className="flex items-center will-change-transform transition-transform duration-300  "></div>
                </div>
            </div>
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
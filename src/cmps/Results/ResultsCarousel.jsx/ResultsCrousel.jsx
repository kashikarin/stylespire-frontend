import { useEffect, useRef, useState } from "react"
import { CarouselArrows } from "./CarouselArrows"
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { breakpoints } from "../../../util/breakpoints"
import { ResultsSlide } from "./ResultsSlide"
import { DotsIndicator } from "./DotsIndicator"

export function ResultsCarousel({ images, onLike, getIsLiked, isLoggedInUser }){
    const imgTrackRef = useRef()
    const frameRef = useRef()  
    const [current, setCurrent] = useState(0)
    const isNarrow = useMediaQuery(breakpoints.tablet)
    const [slideWidth, setSlideWidth] = useState(0)
    console.log("🚀 ~ slideWidth:", slideWidth)

    useEffect(() => {
        if (!frameRef.current) return

        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width
            setSlideWidth(width)
        })

        observer.observe(frameRef.current)

        return () => observer.disconnect()
    }, [])

    function goToSlide(idx){
        const safeIdx = (idx + images.length) % images.length
        setCurrent(safeIdx)
    }

    function onPrevClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        goToSlide(current - 1)
    }

    function onNextClick(ev){
        ev.stopPropagation()
        ev.preventDefault()
        goToSlide(current + 1)
    }

    function onScroll(){
        if (!isNarrow || !imgTrackRef.current || !slideWidth) return 
        const scrollLeft = imgTrackRef.current.scrollLeft
        const index = Math.round(scrollLeft / slideWidth)
        if (index !== current) setCurrent(index)
    }

    function onDotClick(ev, idx){
        ev.preventDefault()
        ev.stopPropagation()
        setCurrent(idx)
        // if (isNarrow) return 

        // imgTrackRef.current.scrollTo({
        //     left: idx * slideWidth,
        //     behavior: "smooth",
        // })
    }

    if (!images || !images.length) return null

    return(
        <article className="w-[90vw] max-w-none narrow:w-full group relative">
            <div 
                ref={frameRef}
                className="w-full overflow-hidden rounded-lg"  
            >
                <div 
                    className={`
                        flex flex-nowrap transition-transform duration-300 
                        ${isNarrow ? "overflow-x-auto snap-x snap-mandatory scroll-smooth"        
                        : ""}
                    `}
                    ref={imgTrackRef}
                    onScroll={onScroll}
                    style={!isNarrow && slideWidth? { transform: `translateX(-${current * slideWidth}px)` } : {} }
                >
                    {images.map((image, i) => (
                        // slide wrapper
                        <div className={`flex-shrink-0 overflow-hidden ${isNarrow? "snap-start" : ''}`} key={i} style={{ width: slideWidth }}>
                            <ResultsSlide image={image} onLike={onLike} isLiked={getIsLiked(image.id)} isLoggedInUser={isLoggedInUser}/>
                        </div>))}
                </div>
                {/* Desktop's arrows */}
                {!isNarrow && <CarouselArrows index={current} length={images.length} onPrevClick={onPrevClick} onNextClick={onNextClick} />}
                <div 
                    className="
                        absolute
                        bottom-[10px]
                        left-1/2
                        -translate-x-1/2
                        z-3
                        pointer-events-none
                    "
                >
                    <DotsIndicator
                        slidesNum={images.length}
                        currentIdx={current}
                        onDotClick={onDotClick}
                    />
                </div> 
            </div>
            {/* tracker */}
            
        </article>
    )
}
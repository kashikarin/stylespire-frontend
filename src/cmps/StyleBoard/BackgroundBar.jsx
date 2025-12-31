import { useRef } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useDragToScroll } from "../../hooks/useDragToScroll"
import { HorizontalCarousel } from "../HorizontalCarousel"

export function BackgroundBar({ backgrounds, selectBackground, onLoadMore, loading, onClose }){
    const barRef = useRef()
    const dragRef = useDragToScroll()
    useOnClickOutside(barRef, onClose)

    return(
        <div 
            ref={barRef}
            className="
                absolute left-full ml-3 top-1/2 -translate-y-1/2
                w-[320px]
                max-h-[45px]
0                bg-white/40
                backdrop-blur-md
                rounded-xl
                shadow-md
            "
        >
            {/* caret */}
            <div
                className="
                    absolute
                    -left-[11px]
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                "
            >
                <div
                    className="
                    absolute
                    w-0 h-0
                    border-y-[12px] border-y-transparent
                    border-r-[12px] border-r-white/60
                    "
                />
                <div
                    className="
                    relative
                    w-0 h-0
                    border-y-[10px] border-y-transparent
                    border-r-[10px] border-r-white/60
                    "
                />
            </div>
            {/* background bar */}
            <div 
                ref={dragRef}
                className="
                    flex gap-2 
                    overflow-y-hidden
                    overflow-x-auto 
                    no-scrollbar
                "
            >
                <HorizontalCarousel>
                    {backgrounds.map(bg => (
                        <button 
                            key={bg}
                            className="
                                w-8 h-8
                                rounded-lg
                                flex-shrink-0
                                bg-cover bg-center
                                border border-white/40
                                hover:border-white/70
                                hover:scale-105
                                transition-none duration-200
                            "
                            onClick={()=> {
                                console.log('bg', bg)
                                selectBackground(bg)
                            }}
                                
                            style={{backgroundImage: `url(${bg})`}}
                        >
                        </button>
                        
                    ))}
                    {!loading && (
                        <button
                            className="
                                bg-white/60
                                backdrop-blur-sm
                                border border-white/20
                                text-sm
                                shadow-sm
                                rounded-md
                                py-1
                                text-black
                                hover:bg-white/80
                                transition-all
                            "
                            onClick={onLoadMore}
                        >
                            +
                        </button>
                    )}
                </HorizontalCarousel>
            </div>
            
       </div>
    )
}
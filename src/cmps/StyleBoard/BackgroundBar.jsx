import { useRef } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useDragToScroll } from "../../hooks/useDragToScroll"
import { HorizontalCarousel } from "../HorizontalCarousel"

export function BackgroundBar({ backgrounds, selectBackground, onLoadMore, loading, onClose, isMobile, position = 'right' }){
    const barRef = useRef()
    const dragRef = useDragToScroll()
    useOnClickOutside(barRef, onClose)

    return(
        <div 
            ref={barRef}
            className={`
                absolute
                ${isMobile 
                    ? 'top-full mt-1 left-0 w-[calc(100vw-48px)] border-2 border-white/60 bg-white/70' 
                    : position === 'left'
                        ? 'right-full mr-5 top-1/2 -translate-y-1/2 w-[320px] bg-white/40'
                        : 'left-full ml-5 top-1/2 -translate-y-1/2 w-[320px] bg-white/40'
                }
                backdrop-blur-md
                rounded-xl
                shadow-md
            `}
        >
            {/* caret */}
            <div
                className={`
                    absolute
                    pointer-events-none
                    ${isMobile 
                        ? '-top-[8px] left-[14px]' 
                        : position === 'left'
                            ? '-right-[11px] top-1/2 -translate-y-1/2'
                            : '-left-[11px] top-1/2 -translate-y-1/2'
                    }
                `}
            >
                {isMobile ? (
                    <>
                        <div className="absolute w-0 h-0 border-x-[8px] border-x-transparent border-b-[8px] border-b-white/80" />
                        <div className="relative w-0 h-0 border-x-[7px] border-x-transparent border-b-[7px] border-b-white/80" />
                    </>
                ) : position === 'left' ? (
                    <>
                        <div className="absolute w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px] border-l-white/60" />
                        <div className="relative w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-white/60" />
                    </>
                ) : (
                    <>
                        <div className="absolute w-0 h-0 border-y-[12px] border-y-transparent border-r-[12px] border-r-white/60" />
                        <div className="relative w-0 h-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-white/60" />
                    </>
                )}
            </div>
            {/* background bar */}
            <div 
                ref={dragRef}
                className={`
                    overflow-y-hidden
                    overflow-x-auto 
                    no-scrollbar
                    ${isMobile 
                        ? 'py-1 px-1' 
                        : position === 'left' 
                            ? 'py-1 pl-1 pr-2' 
                            : 'py-1 pr-1 pl-2'
                    }
                `}
            >
                <HorizontalCarousel className="gap-2 items-center">
                    {backgrounds.map(bg => (
                        <button 
                            key={bg}
                            className={`
                                rounded-md
                                flex-shrink-0
                                bg-cover bg-center
                                p-0 m-0
                                border border-white/40
                                hover:border-white/70
                                hover:scale-105
                                transition-all duration-200
                                ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}
                            `}
                            onClick={()=> selectBackground(bg)}              
                            style={{backgroundImage: `url(${bg})`}}
                        >
                        </button>
                        
                    ))}
                    {!loading && (
                        <button
                            className={`
                                flex items-center justify-center
                                flex-shrink-0
                                bg-white/60
                                backdrop-blur-sm
                                border border-white/20
                                text-sm
                                shadow-sm
                                rounded-md
                                text-black
                                hover:bg-white/80
                                transition-all
                                ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}
                            `}
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
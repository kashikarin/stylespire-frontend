import { useRef } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useDragToScroll } from "../../hooks/useDragToScroll"
import { HorizontalCarousel } from "../HorizontalCarousel"

export function BackgroundBar({ backgrounds, selectBackground, onLoadMore, loading, onClose, isMobile }){
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
                    : 'left-full ml-3 top-1/2 -translate-y-1/2 w-[320px] bg-white/40'
                }
                max-h-[45px]
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
                        : '-left-[11px] top-1/2 -translate-y-1/2'
                    }
                `}
            >
                {isMobile ? (
                    <>
                        <div className="absolute w-0 h-0 border-x-[8px] border-x-transparent border-b-[8px] border-b-white/80" />
                        <div className="relative w-0 h-0 border-x-[7px] border-x-transparent border-b-[7px] border-b-white/80" />
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
                    flex 
                    overflow-y-hidden
                    overflow-x-auto 
                    no-scrollbar
                    ${isMobile ? 'gap-1.5 p-2' : 'gap-2'}
                `}
            >
                <HorizontalCarousel>
                    {backgrounds.map(bg => (
                        <button 
                            key={bg}
                            className={`
                                rounded-lg
                                flex-shrink-0
                                bg-cover bg-center
                                p-0 m-0
                                border border-white/40
                                hover:border-white/70
                                hover:scale-105
                                transition-none duration-200
                                ${isMobile ? 'w-7 h-7' : 'w-8 h-8'}
                            `}
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
                            className={`
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
                                ${isMobile ? 'px-2' : ''}
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
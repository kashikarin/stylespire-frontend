import { useRef } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useDragToScroll } from "../../hooks/useDragToScroll"

export function BackgroundBar({ backgrounds, onSelect, onLoadMore, loading, onClose }){
    const barRef = useRef()
    const dragRef = useDragToScroll()
    useOnClickOutside(barRef, onClose)

    return(
        <div 
            ref={barRef}
            className="
                absolute top-16 left-2
                w-full 
                p-2 
                bg-white/20 
                backdrop-blur-md
                rounded-xl
                border border-white/30 
                shadow-lg shadow-black/5
                overflow-hidden
                narrow:w-1/3
                
                flex flex-col 
                space-y-3
                max-h-[200px]
            "
        >
            <div 
                ref={dragRef}
                className="
                    pb-1
                    flex gap-2 
                    overflow-x-auto
                    overflow-y-hidden
                    snap-x snap-mandatory
                    no-scrollbar
                    overscroll-bounce

                "
            >
                {backgrounds.map(bg => (
                    <button 
                        key={bg}
                        className="
                            border border-white/40
                            flex-shrink-0
                            w-10 h-10
                            rounded-lg
                            cursor-pointer
                            overflow-hidden
                            p-0
                            bg-cover bg-center bg-no-repeat
                            focus:outline-none focus:ring-2 focus:ring-primary
                            narrow:hover:scale-105
                            hover:border-white/70
                            transition-all duration-200
                        "
                        onClick={()=> onSelect(bg)}
                        style={{backgroundImage: `url(${bg})`}}
                    >
                    </button>
                ))}
            </div>
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
                    Show More
                </button>
            )}
       </div>
    )
}
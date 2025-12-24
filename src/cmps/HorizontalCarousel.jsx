import { useDragToScroll } from "../hooks/useDragToScroll"

export function HorizontalCarousel({ children, className }){
    const dragRef = useDragToScroll()

    return(
        <div
            ref={dragRef}
            className={`
                flex gap-3
                overflow-x-auto
                no-scrollbar
                overscroll-bounce
                snap-x snap-mandatory
                ${className}
            `}
        >
            {children}
        </div>
    )
}
import { ReactSVG } from "react-svg"

export function BackgroundIconBtn({ handleMouseEnter }){
    return (
        <button 
            className="
                absolute top-2 left-2
                w-50 h-50
                bg-transparent
                opacity-60
                hover:opacity-100
                transition-all  duration-200
                flex items-center justify-center
                cursor-pointer
            "
            onMouseEnter={handleMouseEnter}
            
        >
            <ReactSVG src='/svgs/colorPalette.svg' />
        </button>
    )
}
import { ReactSVG } from "react-svg"
import { BackgroundBar } from "./BackgroundBar"

export function BackgroundIconBtn({ handleClick }){
    return (
        <button 
            className="
                relative
                flex items-center justify-center
                h-10 w-10 z-20
                cursor-pointer
                bg-white/40
                rounded-lg
                hover:bg-white/60
            "
            onClick={handleClick}            
        >
            <ReactSVG src='/svgs/background-icon.svg'/>
        </button>        
    )
}
import { ReactSVG } from "react-svg";

export function CarouselArrows({ index, length, onPrevClick, onNextClick }){
    return(
        <div 
            className="
                absolute inset-0 
                w-full
                pointer-events-none
                opacity-0 
                transition-opacity duration-300
                group-hover:opacity-90
            "
        >
            <div 
                className="
                    absolute 
                    top-1/2
                    -translate-y-1/2
                    left-2
                    pointer-events-auto
                "
            >
                {index > 0 && (
                    <button
                        onClick={onPrevClick}
                        className="
                            text-primary-dark
                            flex items-center justify-center
                            h-10 w-10
                            opacity-90
                            p-0
                            border-none
                            rounded-full
                            bg-white/60 backdrop-blur-sm
                            shadow-md
                        "
                    >
                        <ReactSVG src='/svgs/left-arrow.svg' className='fill-white drop-shadow-[0_0_3px_white] flex items-center justify-center w-10 h-10' />
                    </button>
                )}
            </div>
            <div
                className="
                    absolute 
                    top-1/2
                    -translate-y-1/2
                    right-2
                    pointer-events-auto
                "
            >
                {index < length - 1 && (
                    <button
                        onClick={onNextClick}
                        className="
                            text-primary-dark
                            flex items-center justify-center
                            h-10 w-10
                            opacity-90
                            p-0
                            border-none
                            rounded-full
                            bg-white/60 backdrop-blur-sm
                            shadow-md
                        "
                    >
                        <ReactSVG src='/svgs/right-arrow.svg' className='fill-white drop-shadow-[0_0_3px_white] flex items-center justify-center w-10 h-10'/>
                    </button>
                )}
            </div>
        </div>
    )
}
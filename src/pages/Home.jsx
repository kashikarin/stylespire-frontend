import { useMediaQuery } from "../hooks/useMediaQuery.js"
import { breakpoints } from "../util/breakpoints.js"
import { openStyleMeModal } from "../store/actions/user.actions.js"

export function Home(){
    const isNarrow = useMediaQuery(breakpoints.tablet)

    return(
        <div 
            className="
                flex flex-col items-center 
                text-center 
                gap-6 px-4 narrow:py-12 
                max-w-2xl mx-auto
            ">
            <h2 className="pt-10 text-4xl md:text-6xl font-semibold text-primary-dark">
                Your Perfect Outfit Starts Here.
            </h2>               
            <p className="text-lg md:text-xl text-primary-dark leading-relaxed max-w-xl">
                Tell us where you’re going and how you’re feeling — we’ll dress you up
            </p>
            {!isNarrow && <p className="text-lg md:text-xl text-primary-dark leading-relaxed max-w-xl">
                Your mood, the weather, and your style come together to inspire the perfect outfit.
            </p>}
            
            <button
                onClick={openStyleMeModal}
                className="
                    mt-4 px-8 py-3
                    bg-primary-dark 
                    text-white 
                    rounded-xl shadow-md 
                    hover:bg-secondary
                    transition
                    text-lg md:text-xl
                "
            >
                Style me!
            </button>
        </div>
        
    )
}
import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { breakpoints } from "../../../util/breakpoints"
import { LikeIcon } from "../../LikeIcon"

export function ResultsSlide({ image, isLoggedInUser }){
    const isNarrow = useMediaQuery(breakpoints.tablet)
    const cleanImage = {
        id: image.id,
        url: image.urls?.small || image.url || '',
        description: image.alt_description || image.description || ''
    }
    return(
        <div className="relative w-full aspect-[4/3] max-h-[90vh]">
            {/* top overlay bar */}
            <div 
                className={`
                    absolute top-0 right-0
                    w-full
                    text-white
                    p-2 
                    rounded full
                    flex justify-end 
                    z-[100]
                    transition-opacity duration-300
                    ${!isNarrow ? 'opacity-0 group-hover:opacity-90' : '' }
                `}
            >
                {(isLoggedInUser || isNarrow) && <LikeIcon image={cleanImage} />}
                
            </div>
            <img 
                src={cleanImage.url} 
                alt={cleanImage.description} 
                className="
                    absolute 
                    inset-0 
                    w-full h-full 
                    object-cover
                " 
            />
        </div>
    )
}
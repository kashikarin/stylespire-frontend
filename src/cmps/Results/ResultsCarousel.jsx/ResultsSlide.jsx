import { useMediaQuery } from "../../../hooks/useMediaQuery"
import { breakpoints } from "../../../util/breakpoints"
import { LikeIcon } from "../../LikeIcon"

export function ResultsSlide({ image, onLike, isLiked, isLoggedInUser }){
    const isNarrow = useMediaQuery(breakpoints.tablet)
    console.log("🚀 ~ ResultsSlide ~ isNarrow:", isNarrow)

    function onLikeFromIcon() {
        onLike(
            isLiked,
            image.urls.small,
            image.id,
            image.alt_description
        )
    }

    return(
        <div className="relative w-full aspect-[4/3] max-h-[90vh]">
            {/* top overlay bar */}
            <div 
                className={`
                    absolute
                    w-full
                    text-white
                    p-2 rounded full
                    top-0 right-0 
                    flex justify-end 
                    z-[100]
                    ${!isNarrow ? 'opacity-0' : ''}
                    transition-opacity duration-300
                    ${!isNarrow ? 'group-hover:opacity-90' : '' }
                `}
            >
                {(isLoggedInUser || isNarrow) && <LikeIcon 
                    imageId={image.id}
                    onLike={onLikeFromIcon} 
                />}
                
            </div>
            <img 
                src={image.urls.small} 
                alt={image.alt_description} 
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
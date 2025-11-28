import { flushKeyframeResolvers } from "framer-motion"
import { small } from "framer-motion/client"
import { addFavorite, loadFavorites, removeFavorite } from "../../../store/actions/favorite.actions"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LikeIcon } from "../../LikeIcon"

export function ResultsSlide({ image, onLike, isLiked, isLoggedInUser }){
    console.log("🚀 ~ image:", image)
    console.log("🚀 ~ isLiked:", isLiked)
    
    function toggleLike(ev){
        ev.stopPropagation()
        onLike(isLiked, image.urls.small, image.id, image.alt_description)
    }

    return(
        <div className="relative w-full aspect-[4/3]">
            {/* top overlay bar */}
            <div 
                className="
                    absolute
                    w-full
                    text-white
                    p-2 rounded full
                    top-0 right-3 
                    flex justify-end 
                    z-[100]
                    opacity-0 
                    transition-opacity duration-300
                    group-hover:opacity-90
                "
            >
                {isLoggedInUser && <LikeIcon imageId={image.id} />}
                
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
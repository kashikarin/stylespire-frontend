import { flushKeyframeResolvers } from "framer-motion"
import { small } from "framer-motion/client"
import { useNavigate } from "react-router-dom"
import { addFavorite, loadFavorites, removeFavorite } from "../../store/actions/favorite.actions"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function ResultsSlide({ image, onLike }){
    const navigate = useNavigate()
    const favorites = useSelector(state => state.favoriteModule.favorites)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isLiked = favorites.some(fav => fav.imageId === image.id)
    console.log("🚀 ~ loggedInUser:", loggedInUser)

    useEffect(()=>{
        initFavorites()
    }, [])

    async function initFavorites() {
        await loadFavorites({ userId: loggedInUser._id })
    } 

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
                {loggedInUser && <button 
                    className="
                        bg-transparent 
                        rounded-full 
                        pointer-events-auto z-10
                        flex items-center justify-center
                    "
                    onClick={toggleLike}
                >
                    <i
                        className={
                            isLiked ? 
                                "fa-solid fa-heart text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)] scale-110 transition-all duration-200"
                                : "fa-regular fa-heart text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.45)] transition-all duration-200"
                        }
                        style={{ fontSize: "24px" }}
                        onClick={toggleLike}
                    />
                </button>}
                
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
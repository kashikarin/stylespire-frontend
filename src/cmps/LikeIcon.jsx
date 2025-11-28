import { useLike } from "../hooks/useLike"

export function LikeIcon({ imageId }){
    const { toggleLike, getIsLiked } = useLike()

    return(
        <button 
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
                            getIsLiked(imageId) ? 
                                "fa-solid fa-heart text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)] scale-110 transition-all duration-200"
                                : "fa-regular fa-heart text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.45)] transition-all duration-200"
                        }
                        style={{ fontSize: "24px" }}
                        onClick={toggleLike}
                    />
                </button>
    )
}
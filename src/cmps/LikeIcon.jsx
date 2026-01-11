import { useLike } from "../hooks/useLike"

export function LikeIcon({ image }){
    const { toggleLike, getIsLiked } = useLike()

    function handleLike(ev){
        ev.stopPropagation()
        toggleLike({
            imageId: image.id,
            imageUrl: image.url,
            imageDescription: image.description
        })
    }

    const isLiked = getIsLiked(image.id)

    return(
        <button 
            className="
                bg-transparent 
                rounded-full 
                pointer-events-auto z-10
                flex items-center justify-center
            "
            onClick={handleLike}
        >
            <i
                className={
                    isLiked ? 
                        "fa-solid fa-heart text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)] scale-110 transition-all duration-200"
                        : "fa-regular fa-heart text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.45)] transition-all duration-200"
                }
                style={{ fontSize: "24px" }}
            />
        </button>
    )
}
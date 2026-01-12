export function ImageModal({ selectedFav, onClose}){
    if (!selectedFav) return null

    return(
        <div 
            className="
                fixed inset-0 
                bg-black/60 backdrop-blur-sm 
                flex justify-center items-center 
                z-[999]
            "
            onClick={onClose}
        >
            <div 
                className="
                    relative 
                    bg-white 
                    rounded-2xl 
                    max-w-2xl w-[90%] 
                    p-4 
                    shadow-shadow-strong 
                    animate-fadeIn
                "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="
                        absolute top-3 right-3 
                        text-gray3 
                        hover:text-gray4
                        bg-transparent
                    "
                >
                    ✕
                </button>
                {/* Image */}
                <div className="overflow-hidden rounded-xl">
                    <img 
                        src={selectedFav.image.url} 
                        alt={selectedFav.image.description} 
                        className="
                            w-full max-h-[70vh] 
                            object-contain
                        "
                    />
                </div>
                {/* Description */}
                <p 
                    className="
                        mt-4 
                        text-gray4 
                        text-sm 
                        leading-relaxed
                    "
                >
                    {selectedFav.image.description}
                </p>

                {/* Optional Footer */}
                <div 
                    className="
                        mt-3 
                        text-xs 
                        text-gray3 
                        flex justify-between
                    "
                >
                    <span>
                        Added: {new Date(selectedFav.createdAt).toLocaleDateString()}
                    </span>
                    <span>ID: {selectedFav._id}</span>
                </div>
            </div>           
        </div>
    )
}
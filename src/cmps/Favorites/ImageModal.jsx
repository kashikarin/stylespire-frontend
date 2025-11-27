export function IamgeModal({ selectedFav, onClose}){
    if (!selectedFav) return null

    return(
        <div 
            className="modal-backdrop"
            onClick={onClose}
        >
            <img 
                src={selectedFav.imageUrl} 
                alt="" 
                className="modal-image"
            />
        </div>
    )
}
export function FavoriteItem({ image, onClick }){
    return(
        <div onClick={onClick}>
            <img src={image.url} />
        </div>
    )
}
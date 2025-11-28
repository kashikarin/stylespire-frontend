import { ResultsCarousel } from "../cmps/Results/ResultsCarousel.jsx/ResultsCrousel"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { useLike } from "../hooks/useLike"
import { useResults } from "../hooks/useResults"

export function Results() {
    const { isLoggedInUser } = useIsLoggedInUser()
    const { images } = useResults()
    const { getIsLiked, toggleLike } = useLike()
    if (!images) return <h3>Sorry, no result...</h3>
    
    return(
        <section className="w-full mx-auto flex flex-col gap-2 narrow:w-2/3 ">
            <h1>images below my friend</h1>
            <ResultsCarousel images={images} onLike={toggleLike} getIsLiked={getIsLiked} isLoggedInUser={isLoggedInUser}/>
        </section>
    )
}
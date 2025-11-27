import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../customHooks/useMediaQuery"
import { breakpoints } from "../util/breakpoints"
import { ResultsSlide } from "../cmps/ResultsCarousel.jsx/ResultsSlide"
import { DotsIndicator } from "../cmps/ResultsCarousel.jsx/DotsIndicator"
import { ResultsCarousel } from "../cmps/ResultsCarousel.jsx/ResultsCrousel"
import { useSelector } from "react-redux"
import { addFavorite, loadFavorites, removeFavorite } from "../store/actions/favorite.actions"

export function Results() {
    const location = useLocation()
    const { results: images } = location.state
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    console.log("🚀 ~ state.results:", location.state.results)
    const favorites = useSelector(state => state.favoriteModule.favorites)

    useEffect(()=>{
        if (!loggedInUser) return
        loadFavorites({userId: loggedInUser._id})
    }, [loggedInUser])
    
    async function toggleLike(isLiked, imageUrl, imageId, imageDescription){
        if (isLiked) {
            const {_id: favoriteId} = favorites.find(f => f.imageId === imageId)
            removeFavorite(favoriteId)
        } else addFavorite(
                    loggedInUser._id, 
                    loggedInUser.fullname, 
                    imageUrl, 
                    imageId, 
                    imageDescription
                )
    }

    if (!images) return <h3>Sorry, no result...</h3>
    
    return(
        <section className="w-full mx-auto flex flex-col gap-2 narrow:w-2/3 ">
            <h1>images below my friend</h1>
            <ResultsCarousel images={images} onLike={toggleLike}/>
        </section>
    )
}
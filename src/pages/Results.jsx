import { Loader } from "../cmps/Loader"
import { ResultsCarousel } from "../cmps/Results/ResultsCarousel.jsx/ResultsCrousel"
import { ResultsTags } from "../cmps/Results/ResultsTags"
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"
import { useLike } from "../hooks/useLike"
import { useResults } from "../hooks/useResults"
import { ReactSVG } from "react-svg"

export function Results() {
    const { isLoggedInUser } = useIsLoggedInUser()
    const { formData, results, loading, refresh } = useResults()
    const { getIsLiked, toggleLike } = useLike()

    if (!results || results.length === 0)
        return (
        <h3 className="text-center mt-12 text-primary-dark">
            No looks found for your style.
        </h3>
        )
    if (loading || !formData)
        return (

        <Loader />
        )
    return(
        <section className="w-full mx-auto flex flex-col gap-2 narrow:w-2/3 ">
            <div className="flex justify-between">
                <h3 
                    className="
                        text-2xl 
                        narrow:text-3xl 
                        font-semibold 
                        text-primary-dark
                        tracking-tight
                    "
                >
                    Your personalized style inspirations
                </h3>
                <button 
                    className="
                        hidden
                        normal:self-start
                        normal:inline-flex normal:items-center normal:justify-center
                        normal:px-4 normal:py-1.5 normal:rounded-full
                        normal:text-primary-dark normal:text-sm normal:font-medium 
                        normal:bg-primary-dark-10 
                        normal:border normal:border-primary-dark-40
                        normal:shadow-[0_0_6px_theme(colors.primary-dark-40)]
                        normal:transition-colors normal:duration-200
                       normal:hover:bg-primary-dark-10/20                        
                    "
                    onClick={refresh}
                >
                    ✨ Refresh Looks
                </button>
                <button 
                    className="
                        self-start
                        inline-flex items-center justify-center
                        p-2 rounded-full
                        text-primary-dark text-sm font-medium 
                        bg-primary-dark-10 
                        border border-primary-dark-40
                        shadow-[0_0_2px_theme(colors.primary-dark-40)]
                        normal:hidden                     
                    "
                    onClick={refresh}
                >
                    <ReactSVG src='/svgs/refresh.svg' />
                </button>
            </div>
            <ResultsTags formData={formData} />
            <ResultsCarousel images={results} onLike={toggleLike} getIsLiked={getIsLiked} isLoggedInUser={isLoggedInUser}/>
        </section>
    )
}

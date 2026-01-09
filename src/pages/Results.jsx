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
        <Loader />
        )
    if (loading || !formData)
        return (

            <Loader />
        )
    return(
        <section className="w-full max-w-7xl mx-auto px-4flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <h3 
                        className="
                            text-2xl 
                            narrow:text-3xl 
                            font-semibold 
                            text-primary-dark
                            tracking-tight
                            m-1
                        "
                    >
                        Curated Outfit Suggestions
                    </h3>
                    <p className="text-sm text-primary-dark/60">
                        Based on your selected preferences
                    </p>
                </div>
                <button 
                    className="
                        hidden
                        normal:self-start
                        normal:inline-flex normal:items-center normal:gap-2
                        normal:px-4 normal:py-1.5 
                        normal:rounded-full
                        normal:text-primary-dark 
                        normal:text-sm normal:font-medium 
                        normal:bg-primary-dark/5
                        normal:border normal:border-primary-dark-20
                        normal:shadow-[0_0_6px_theme(colors.primary-dark-20)]
                        normal:transition-all normal:duration-200
                      normal:hover:bg-primary-dark-10 
                        hover:translate-y-[-1px]   
                        normal:hover:shadow-[0_0_10px_theme(colors.primary-dark/30)]
                        active:scale-[0.98]                    
                    "
                    onClick={refresh}
                >
                    Refresh Suggestions
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
            <p className="text-xs text-primary-dark/50 text-center mt-2">
  Like a look to save it to your favorites
</p>
        </section>
    )
}

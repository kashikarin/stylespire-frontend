import { useMediaQuery } from "../hooks/useMediaQuery.js"
import { breakpoints } from "../util/breakpoints.js"
import { CategoryBlock } from "../cmps/CategoryBlock.jsx"
import { useHomeHero } from "../hooks/useHomeHero.js"

export function Home(){
    const isMobile = useMediaQuery(breakpoints.mobile)
    const isTablet = useMediaQuery(breakpoints.tablet)
    const isLaptop = useMediaQuery(breakpoints.laptop)
    const {
        formData,
        currentStep,
        updateField,
        handleNext,
        handleBack,
        handleSubmit,
        isStep1Valid,
        isStep2Valid,
        isStep3Valid,
        totalSteps,
        visibleStep,
    } = useHomeHero({ isMobile, isTablet })    
    
    return(
        <div 
            className="
                max-h-[calc(100svh-80px)] 
                overflow-hidden
                [&::-webkit-scrollbar]:hidden 
                flex 
                normal:items-center 
                py-2 narrow:py-4 px-4
            " 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div 
                className="
                    max-w-7xl w-full
                    mx-auto 
                    grid grid-cols-1 normal:grid-cols-2 gap-8 narrow:gap-12 normal:gap-16 items-center
                "
            >
                {/* Left: Editorial Copy */}
                <div className="flex flex-col gap-4 narrow:gap-6">
                    <div className="inline-block self-start">
                        <span 
                            className="
                                text-xs narrow:text-sm font-medium 
                                tracking-wider uppercase 
                                px-3 py-1 
                                rounded-full 
                                bg-primary-dark-50
                                text-primary-dark
                            "
                        >
                            A Smart Styling Workspace
                        </span>
                    </div>
                    
                    <h1 
                        className="
                            text-3xl narrow:text-4xl normal:text-5xl wide:text-6xl 
                            font-bold 
                            text-primary-dark 
                            leading-tight
                        "
                    >
                        <span className="text-primary-dark">
                            Transform Personal Style
                            Into Actionable Outfit Boards
                        </span>
                    </h1>
                    
                    <p 
                        className="
                            text-base narrow:text-lg normal:text-xl 
                            text-primary-dark/70 
                            leading-relaxed 
                            max-w-lg
                        "
                    >
                        Define your preferences, receive curated outfit suggestions,
                        and organize selected looks into editable styleboards.
                    </p>

                    {!isMobile && !isTablet && !isLaptop && (
                        <div 
                            className="
                                flex gap-6 narrow:gap-8 
                                pt-2 narrow:pt-4
                            "
                        >
                            
                            <div className='min-h-[72px]'>
                                <div 
                                    className="
                                        text-2xl narrow:text-3xl 
                                        font-bold 
                                        text-primary-dark
                                    "
                                >
                                    AI-Guided Curation
                                </div>
                                <div 
                                    className="
                                        text-xs narrow:text-sm 
                                        uppercase tracking-[0.12em] 
                                        text-primary-dark/60
                                    "
                                >
                                    Preference-Driven
                                </div>
                            </div>
                            <div className='min-h-[72px]'>
                                <div 
                                    className="
                                        text-2xl narrow:text-3xl font-bold 
                                        text-primary-dark
                                    "
                                >
                                    Persistent Favorites
                                </div>
                                <div 
                                    className="
                                        text-xs narrow:text-sm 
                                        uppercase tracking-[0.12em] 
                                        text-primary-dark/60
                                    "
                                >
                                    Always Available
                                </div>
                            </div>
                            <div className='min-h-[72px]'>
                                <div 
                                    className="
                                        text-2xl narrow:text-3xl 
                                        font-bold 
                                        text-primary-dark
                                    "
                                >
                                    Canvas-Based Styleboards
                                </div>
                                <div 
                                    className="
                                        text-xs narrow:text-sm 
                                        uppercase 
                                        tracking-[0.12em] 
                                        text-primary-dark/60
                                    "
                                >
                                    Fully Editable
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Interactive Styling Surface */}
                <div className="w-full">
                    <div 
                        className="
                            bg-white 
                            rounded-2xl narrow:rounded-3xl 
                            shadow-[0_8px_30px_rgb(0,0,0,0.06)] 
                            p-4 narrow:p-6 normal:p-8 
                            border border-primary-dark/10 
                            backdrop-blur-sm
                        "
                    >
                        {/* Progress Indicator */}
                        <div 
                            className="
                                flex items-center justify-between 
                                mb-3 narrow:mb-5 normal:mb-6
                            "
                        >
                            <div className="flex items-center gap-2">
                                {[1, 2, 3].slice(0, totalSteps).map((step, index) => (
                                    <div key={step} className="flex items-center gap-2">
                                        {index > 0 && (
                                            <div 
                                                className="
                                                    w-12 narrow:w-16 h-1 
                                                    rounded-full 
                                                    bg-gray-200
                                                "
                                            >
                                                <div 
                                                    className="
                                                        h-full 
                                                        rounded-full 
                                                        bg-primary-dark 
                                                        transition-all duration-500
                                                    "
                                                    style={{ width: visibleStep > step - 1 ? 
                                                            '100%' : '0%' 
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div 
                                            className={`
                                                w-7 h-7 narrow:w-8 narrow:h-8 
                                                rounded-full 
                                                flex items-center justify-center 
                                                text-xs narrow:text-sm font-medium 
                                                transition-all duration-300 
                                                ${visibleStep === step ? 
                                                    'bg-primary-dark text-white' : 
                                                    'bg-primary-dark text-home-gray'
                                                }`}
                                        >
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs narrow:text-sm text-primary-dark-60 font-medium">
                                Step {visibleStep} of {totalSteps}
                            </span>
                        </div>

                        <form 
                            onSubmit={handleSubmit} 
                            className="space-y-3 narrow:space-y-5 normal:space-y-6"
                        >
                            {/* Desktop 2-step flow */}
                            {!isMobile && !isTablet && (
                                <>
                                    {/* Step 1: Basics & Mood */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <CategoryBlock 
                                                title='I am'
                                                field='gender'
                                                labels={['Female', 'Male', 'Nonbinary']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                            <CategoryBlock 
                                                title='Age group'
                                                field='age'
                                                labels={['Teen', '20-30', '30-45', '45-60', '60+']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                            <CategoryBlock 
                                                title='My mood today'
                                                field='mood'
                                                labels={['Playful', 'Comfi', 'Chic', 'Romantic', 'Cool', 'Confident', 'Energetic', 'Bold']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                        </div>
                                    )}

                                    {/* Step 2: Style & Purpose */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6 animate-fadeIn">
                                            <CategoryBlock 
                                                title='My style vibe'
                                                field='style'
                                                labels={['Casual', 'Sporty', 'Elegant', 'Street', 'Minimal', "Boho", "Trendy"]}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                            <CategoryBlock 
                                                title='Where am I going?'
                                                field='purpose'
                                                labels={['Office', 'Dinner', 'Errands', 'Date', 'Night Out', 'Picking Up Kids', "Training", 'Coffee Stop', 'Friends Meetup']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Mobile 3-step flow */}
                            {(isMobile || isTablet) && (
                                <>
                                    {/* Step 1: Gender & Age */}
                                    {currentStep === 1 && (
                                        <div className="space-y-3 animate-fadeIn">
                                            <CategoryBlock 
                                                title='I am'
                                                field='gender'
                                                labels={['Female', 'Male', 'Nonbinary']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                            <CategoryBlock 
                                                title='Age group'
                                                field='age'
                                                labels={['Teen', '20-30', '30-45', '45-60', '60+']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                        </div>
                                    )}

                                    {/* Step 2: Mood & Style */}
                                    {currentStep === 2 && (
                                        <div className="space-y-3 animate-fadeIn">
                                            <CategoryBlock 
                                                title='My mood today'
                                                field='mood'
                                                labels={['Playful', 'Comfi', 'chic', 'romantic', 'cool', 'confident', 'energetic', 'bold']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                            <CategoryBlock 
                                                title='My style vibe'
                                                field='style'
                                                labels={['Casual', 'Sporty', 'Elegant', 'Street', 'Minimal', "Boho", "Trendy"]}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                        </div>
                                    )}

                                    {/* Step 3: Purpose */}
                                    {currentStep === 3 && (
                                        <div className="space-y-3 animate-fadeIn">
                                            <CategoryBlock 
                                                title='Where am I going?'
                                                field='purpose'
                                                labels={['Office', 'Dinner', 'Errands', 'Date', 'night out', 'Picking Up Kids', "Training", 'Coffee stop', 'Friends meetup']}
                                                formData={formData}
                                                updateField={updateField}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2 narrow:pt-3 normal:pt-4">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="
                                            px-5 narrow:px-6 py-2.5 narrow:py-3 
                                            text-sm narrow:text-base 
                                            rounded-xl 
                                            border-2 border-primary-dark/20 
                                            text-primary-dark font-medium 
                                            bg-white
                                            hover:bg-primary-dark/5 
                                            transition
                                        "
                                    >
                                        Back
                                    </button>
                                )}
                                
                                {/* Desktop: 2 steps */}
                                {!isMobile && !isTablet && (
                                    <>
                                        {currentStep === 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!isStep1Valid}
                                                className={`
                                                    flex-1 
                                                    py-2.5 narrow:py-3 
                                                    text-sm narrow:text-base 
                                                    rounded-xl 
                                                    font-medium text-white 
                                                    transition-all duration-300 
                                                    shadow-lg 
                                                    ${ isStep1Valid 
                                                        ? 'bg-primary-dark hover:bg-accent-light hover:scale-[1.02]' 
                                                        : 'bg-gray5 opacity-40 cursor-not-allowed'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={!isStep2Valid}
                                                className={`flex-1 py-2.5 narrow:py-3 text-sm narrow:text-base rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep2Valid && isStep3Valid
                                                        ? 'bg-primary-dark hover:bg-accent-light hover:scale-[1.02]' 
                                                        : 'bg-gray5 opacity-40 cursor-not-allowed'
                                                }`}
                                            >
                                                Show My Looks ✨
                                            </button>
                                        )}
                                    </>
                                )}

                                {/* Mobile: 3 steps */}
                                {(isMobile || isTablet) && (
                                    <>
                                        {currentStep === 1 && (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!isStep1Valid}
                                                className={`
                                                    flex-1 
                                                    py-2.5 
                                                    text-sm 
                                                    rounded-xl 
                                                    font-medium 
                                                    text-white 
                                                    transition-all duration-300 
                                                    shadow-lg 
                                                    ${isStep1Valid 
                                                        ? 'bg-primary-dark hover:bg-accent-light' 
                                                        : 'bg-gray5 opacity-40 cursor-not-allowed'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        )}
                                        {currentStep === 2 && (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!isStep2Valid}
                                                className={`
                                                    flex-1 
                                                    py-2.5 
                                                    text-sm 
                                                    rounded-xl 
                                                    font-medium 
                                                    text-white 
                                                    transition-all duration-300 
                                                    shadow-lg 
                                                    ${isStep2Valid 
                                                        ? 'bg-primary-dark hover:bg-accent-light' 
                                                        : 'bg-gray5 opacity-40 cursor-not-allowed'
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        )}
                                        {currentStep === 3 && (
                                            <button
                                                type="submit"
                                                disabled={!isStep3Valid}
                                                className={`
                                                    flex-1 
                                                    py-2.5 
                                                    text-sm 
                                                    rounded-xl 
                                                    font-medium text-white 
                                                    transition-all duration-300 
                                                    shadow-lg 
                                                    ${isStep3Valid 
                                                        ? 'bg-primary-dark hover:bg-accent-light' 
                                                        : 'bg-gray5 opacity-40 cursor-not-allowed'
                                                    }`}
                                            >
                                                Show My Looks ✨
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

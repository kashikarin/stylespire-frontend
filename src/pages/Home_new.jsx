import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "../hooks/useMediaQuery.js"
import { breakpoints } from "../util/breakpoints.js"
import { CategoryBlock } from "../cmps/CategoryBlock"

export function Home(){
    const navigate = useNavigate()
    const isMobile = useMediaQuery(breakpoints.mobile)
    const isTablet = useMediaQuery(breakpoints.tablet)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        mood: [],
        style: [],
        purpose: []
    })

    // Tonal variations of #407076
    const accentColor = '#407076'
    const accentLight = '#5A8B91'
    const accentLighter = '#7AA5AB'

    function updateField(field, label) {
        if ((field === 'gender') || (field === 'age')) {
            setFormData(prev => ({...prev, [field]: label}))
        } else {
            const alreadySelected = formData[field].includes(label)
            setFormData(prev => ({
                ...prev, 
                [field]: alreadySelected 
                    ? prev[field].filter(l => l !== label) 
                    : [...prev[field], label]
            }))
        }
    }

    function handleNext() {
        if (currentStep === 1 && formData.gender && formData.age) {
            setCurrentStep(2)
        } else if (currentStep === 2 && formData.mood.length > 0 && formData.style.length > 0) {
            setCurrentStep(3)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.purpose.length > 0) {
            navigate('/results', { state: { formData } })
        }
    }

    const isStep1Valid = formData.gender && formData.age
    const isStep2Valid = formData.mood.length > 0 && formData.style.length > 0
    const isStep3Valid = formData.purpose.length > 0

    const totalSteps = isMobile || isTablet ? 3 : 2
    const mobileCurrentStep = isMobile || isTablet ? currentStep : (currentStep === 1 ? 1 : 2)

    return(
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto flex items-center py-2 narrow:py-4 px-4">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 normal:grid-cols-2 gap-8 narrow:gap-12 normal:gap-16 items-center">
                {/* Left: Editorial Copy */}
                <div className="flex flex-col gap-4 narrow:gap-6">
                    <div className="inline-block self-start">
                        <span 
                            className="text-xs narrow:text-sm font-medium tracking-wider uppercase px-3 py-1 rounded-full bg-[#407076]/5 text-primary-dark"
                        >
                            Your Style, Your Story
                        </span>
                    </div>
                    
                    <h1 className="text-3xl narrow:text-4xl normal:text-5xl wide:text-6xl font-bold text-primary-dark leading-tight">
                        Your Perfect Outfit,<br />
                        <span className="text-[#407076]">
                            Built Around Your Vibe
                        </span>
                    </h1>
                    
                    {!isMobile && !isTablet && (
                        <p className="text-base narrow:text-lg normal:text-xl text-primary-dark/70 leading-relaxed max-w-lg">
                            Tell us about your mood, your plans, and your style. We'll curate personalized outfit inspiration 
                            that feels authentically <em>you</em>.
                        </p>
                    )}

                    {!isTablet && (
                        <div className="flex gap-6 narrow:gap-8 pt-2 narrow:pt-4">
                            <div>
                                <div className="text-2xl narrow:text-3xl font-bold text-primary-dark">2 Steps</div>
                                <div className="text-xs narrow:text-sm text-primary-dark/60">Quick & Easy</div>
                            </div>
                            <div>
                                <div className="text-2xl narrow:text-3xl font-bold text-primary-dark">AI-Powered</div>
                                <div className="text-xs narrow:text-sm text-primary-dark/60">Smart Styling</div>
                            </div>
                            <div>
                                <div className="text-2xl narrow:text-3xl font-bold text-primary-dark">∞ Looks</div>
                                <div className="text-xs narrow:text-sm text-primary-dark/60">Endless Ideas</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Interactive Styling Surface */}
                <div className="w-full">
                    <div className="bg-white rounded-2xl narrow:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-4 narrow:p-6 normal:p-8 border border-primary-dark/10 backdrop-blur-sm">
                        {/* Progress Indicator */}
                        <div className="flex items-center justify-between mb-3 narrow:mb-5 normal:mb-6">
                            <div className="flex items-center gap-2">
                                {[1, 2, 3].slice(0, totalSteps).map((step, index) => (
                                    <div key={step} className="flex items-center gap-2">
                                        {index > 0 && (
                                            <div className="w-12 narrow:w-16 h-1 rounded-full bg-gray-200">
                                                <div 
                                                    className="h-full rounded-full bg-[#407076] transition-all duration-500"
                                                    style={{ width: mobileCurrentStep > step - 1 ? '100%' : '0%' }}
                                                />
                                            </div>
                                        )}
                                        <div 
                                            className={`w-7 h-7 narrow:w-8 narrow:h-8 rounded-full flex items-center justify-center text-xs narrow:text-sm font-medium transition-all duration-300 ${
                                                mobileCurrentStep === step ? 'bg-[#407076] text-white' : 'bg-[#E9ECEF] text-[#6C757D]'
                                            }`}
                                        >
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs narrow:text-sm text-primary-dark/60 font-medium">
                                Step {mobileCurrentStep} of {totalSteps}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 narrow:space-y-5 normal:space-y-6">
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
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-5 narrow:px-6 py-2.5 narrow:py-3 text-sm narrow:text-base rounded-xl border-2 border-primary-dark/20 text-primary-dark font-medium hover:bg-primary-dark/5 transition"
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
                                                className={`flex-1 py-2.5 narrow:py-3 text-sm narrow:text-base rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep1Valid 
                                                        ? 'bg-[#407076] hover:bg-[#5A8B91] hover:scale-[1.02]' 
                                                        : 'bg-[#CCC] opacity-40 cursor-not-allowed'
                                                }`}
                                            >
                                                Next
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={!isStep2Valid || !isStep3Valid}
                                                className={`flex-1 py-2.5 narrow:py-3 text-sm narrow:text-base rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep2Valid && isStep3Valid
                                                        ? 'bg-[#407076] hover:bg-[#5A8B91] hover:scale-[1.02]' 
                                                        : 'bg-[#CCC] opacity-40 cursor-not-allowed'
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
                                                className={`flex-1 py-2.5 text-sm rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep1Valid 
                                                        ? 'bg-[#407076] hover:bg-[#5A8B91]' 
                                                        : 'bg-[#CCC] opacity-40 cursor-not-allowed'
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
                                                className={`flex-1 py-2.5 text-sm rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep2Valid 
                                                        ? 'bg-[#407076] hover:bg-[#5A8B91]' 
                                                        : 'bg-[#CCC] opacity-40 cursor-not-allowed'
                                                }`}
                                            >
                                                Next
                                            </button>
                                        )}
                                        {currentStep === 3 && (
                                            <button
                                                type="submit"
                                                disabled={!isStep3Valid}
                                                className={`flex-1 py-2.5 text-sm rounded-xl font-medium text-white transition-all duration-300 shadow-lg ${
                                                    isStep3Valid 
                                                        ? 'bg-[#407076] hover:bg-[#5A8B91]' 
                                                        : 'bg-[#CCC] opacity-40 cursor-not-allowed'
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

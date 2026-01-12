import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useHomeHero({ isMobile, isTablet }) {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        mood: [],
        style: [],
        purpose: []
    })
    const isStep1Valid = isTablet ? 
        Boolean(formData.gender && formData.age) :
        Boolean(formData.gender && formData.age && formData.mood.length > 0)
    const isStep2Valid = isTablet ? 
        Boolean(formData.mood.length > 0 && formData.style.length > 0) : 
        Boolean(formData.style.length > 0 && formData.purpose.length > 0)
    const isStep3Valid = Boolean(formData.purpose.length > 0)

    const totalSteps = isMobile || isTablet ? 3 : 2
    const visibleStep =
        isMobile || isTablet ? 
            currentStep :
            currentStep === 1 ? 
                1
                : 2

    function updateField(field, label) {
        if ((field === 'gender') || (field === 'age')) {
            setFormData(prev => ({...prev, [field]: label}))
            return
        }

        setFormData(prev => {
            const alreadySelected = prev[field].includes(label)
            return {
                ...prev,
                [field]: alreadySelected ? 
                    prev[field].filter(l => l !== label) 
                    : [...prev[field], label]
            }
        })
    }

    function handleNext() {
        if (currentStep === 1 && isStep1Valid) {
            setCurrentStep(2)
        } else if (currentStep === 2 && isStep2Valid) {
            setCurrentStep(3)
        }
    }

    function handleBack() {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!isStep3Valid) return
        navigate('/results', { state: { formData } })
    }

    return{
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
    }
}
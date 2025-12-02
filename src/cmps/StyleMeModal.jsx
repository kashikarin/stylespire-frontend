import { useState } from "react"
import { CategoryBlock } from "./CategoryBlock"
import { useNavigate } from "react-router-dom"
import { setLoadingDone, setLoadingStart } from "../store/actions/system.actions"

export function StyleMeModal({onClose}){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        mood: [],
        style: [],
        purpose: []
    })

  function updateField(field, label) {
    if ((field === 'gender') || (field === 'age')) setFormData(prev => ({...prev, [field]: label}))
    else {
        const alreadySelected = formData[field].includes(label)
        setFormData(prev => ({...prev, [field]: alreadySelected ? prev[field].filter(l => l !== label) : [...prev[field], label]}))
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    setLoadingStart()
    try {
        onClose()
        navigate('/results', { state: { formData } })

    } catch(err){
        console.error("Error fetching outfits:", err)
    }
    finally {
       setLoadingDone() 
    }
  }

    return(
        <>
            <div className="
                    hidden 
                    narrow:fixed 
                    narrow:inset-0 
                    narrow:bg-black/60 
                    narrow:backdrop-blur-sm 
                    narrow:z-20 
                    narrow:flex 
                    narrow:items-center 
                    narrow:justify-center
                " 
                onClick={onClose}>
            
            </div>
            <div className="
                    fixed 
                    inset-0 z-30 
                    bg-surface 
                    flex flex-col
                    p-4 gap-3 
                    h-[100dvh] 
                    w-full 
                    overflow-y-auto               
                     
                    justify-center 
                    narrow:gap-4 
                    narrow:p-8
                    narrow:relative 
                    narrow:h-auto 
                    narrow:rounded-xl 
                    narrow:shadow-soft 
                    narrow:w-9/10 
                    narrow:max-w-xl
                "
                onClick={(e) => e.stopPropagation()}
            >
                <span className='
                    pt-6
                    text-left 
                    text-xl
                    font-medium
                    narrow:text-center
                    narrow:pt-0


                '>
                    Style Input Needed
                </span>
                <p className="
                    text-left 
                    mb-0
                    text-text-primary-dark 
                    text-m
                    narrow:text-center
                ">A few quick picks and we'll craft outfits that match your vibe</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 narrow:space-y-8">
                    <CategoryBlock 
                        title='Gender'
                        field='gender'
                        labels={['Female', 'Male', 'Nonbinary']}
                        formData={formData}
                        updateField={updateField}
                    />
                    <CategoryBlock 
                        title='Age group'
                        field='age'
                        labels={['teen', '20-30', '30-45', '45-60', '60+']}
                        formData={formData}
                        updateField={updateField}
                    />
                    <CategoryBlock 
                        title='Mood'
                        field='mood'
                        labels={['Playful', 'Comfi', 'chic', 'romantic', 'cool', 'confident', 'energetic', 'bold']}
                        formData={formData}
                        updateField={updateField}
                    />
                    <CategoryBlock 
                        title='Preferred Style'
                        field='style'
                        labels={['Casual', 'Sporty', 'Elegant', 'Street', 'Minimal', "Boho", "Trendy"]}
                        formData={formData}
                        updateField={updateField}
                    />
                    <CategoryBlock 
                        title='Outfit purpose'
                        field='purpose'
                        labels={['Office', 'Dinner', 'Errands', 'Date', 'night out', 'Picking Up Kids', "Training", 'Coffee stop', 'Friends meetup']}
                        formData={formData}
                        updateField={updateField}
                    />
                    <button type='submit' 
                            className='rounded-full 
                            bg-primary-dark 
                            text-surface 
                            m-auto 
                            hover:scale-105 
                            transition 
                            duration-300 
                            ease-in-out'
                    >
                        Show My Looks
                    </button>
                </form>
                <button className='absolute top-0 right-0 text-l bg-transparent text-primary-dark hover:text-secondary' 
                        onClick={onClose}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </>
    )
}
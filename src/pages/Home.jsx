import { useState } from "react"
import { Link } from "react-router-dom"
import { ImageUploader } from "../cmps/ImageUploader"

export function Home(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    function handleClose(ev) {
        ev.preventDefault()
        setIsModalOpen(false)
    }

    return(
        <>
            <div className="page-layout home-page-container">
                <h2 className="home-page-subtitle">See it. Love it. Find it.</h2>
                <p className="upload-instruction">
                    Upload an image or paste a link to get instant insights about the style, color palette, and overall aesthetic.
                </p>
                <button onClick={() => setIsModalOpen(true)}>Follow your inspiration</button> 
            </div>
            {isModalOpen && <ImageUploader onClose={handleClose}/>}
        </>
        
    )
}
import { useState } from "react"
import { Link } from "react-router-dom"
import { ImageUploader } from "../cmps/ImageUploader"
import { motion, AnimatePresence } from "framer-motion"

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
                    Upload an image to uncover the outfit, colors, and style — and explore similar looks instantly.
                </p>
                <button onClick={() => setIsModalOpen(true)}>Follow your inspiration</button> 
            </div>
            <AnimatePresence>
                {isModalOpen && 
                    // <motion.div
                    //     className="image-uploader-backdrop"
                    //     initial={{ opacity: 0 }}
                    //     animate={{ opacity: 1 }}
                    //     exit={{ opacity: 0 }}
                    //     transition={{ duration: 0.3 }}
                    // >
                        <motion.div
                            className="upload-section"
                            initial={{ opacity: 0 }}
                            animate={{opacity: 1 }}
                            exit={{  opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ImageUploader onClose={handleClose}/>
                        {/* </motion.div> */}
                    </motion.div>}
            </AnimatePresence>
            
            
                
                
        </>
        
    )
}
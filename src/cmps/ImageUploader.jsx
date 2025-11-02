import { useState } from "react"


export function ImageUploader({onClose}){
    const [mode, setMode] = useState(null)
    return(
        <div className="image-uploader-backdrop">
            <div className="upload-section">
                <span>Upload a photo or paste an image link — you only need one</span>
                <div className="option-buttons">
                    <button
                        className={`option-btn ${mode === 'upload' ? 'active' : ''}`}
                        onClick={() => setMode('upload')}
                    >
                    <i class="fa-solid fa-upload"></i>
                    </button>
                    <button
                        className={`option-btn ${mode === 'url' ? 'active' : ''}`}
                        onClick={() => setMode('url')}
                    >
                        <i className="fa-solid fa-link"></i>
                    </button>
                </div>
                <button className='close-modal-btn' onClick={onClose}>x</button>
                {/* <p>Upload an image or paste a URL</p> */}
                {mode === 'upload' && <button className="upload-btn">Upload Image</button>}
                {mode === 'url' && <input type="text" placeholder="Paste image URL" />}
            </div>
        </div>
        
    )
}
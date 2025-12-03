import { useRef, useState } from "react"
import { uploadToCloudinary } from "../services/cloudinary.service"

export function ImageUploader({onClose}){
    const [imgUrl, setImgUrl] = useState(null)
    console.log("🚀 ~ imgUrl:", imgUrl)
    const fileInputRef = useRef(null)

    function handleClickUpload() {
        fileInputRef.current?.click()
    }

    async function handleFileChange(ev) {
        const file = ev.target.files[0]
        if (!file) return
        try {
            const url = await uploadToCloudinary(file)
            setImgUrl(url)
        } catch(err) {  
            console.error('Failed to upload the image', er)
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
                    inset-0 
                    h-[100dvh] 
                    w-full 
                    bg-surface 
                    p-8 
                    flex 
                    flex-col 
                    justify-center 
                    gap-4 
                    z-30
                    narrow:relative 
                    narrow:gap-4 
                    narrow:h-auto 
                    narrow:rounded-xl 
                    narrow:shadow-soft 
                    narrow:w-9/10 
                    narrow:max-w-xl
                "
            >
                <span className='
                    text-left 
                    text-l
                    narrow:text-center

                '>
                    Take a clear photo of your open fridge
                </span>
                <p className="
                    text-left 
                    text-ltext-primary-dark 
                    text-m
                    narrow:text-center
                ">Make sure most of the ingredients are visible</p>
                <p className="
                    hidden 
                    text-left 
                    text-text-muted 
                    text-m 
                    narrow:block
                ">
                    AI tip: partial visibility is OK, but clearer items lead to better recipe results
                </p>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="
                        hidden
                    "
                />
                <button
                    className={`
                        text-3xl 
                        m-auto
                        text-primary-dark 
                        transition transform
                        bg-transparent
                        w-[20px] h-[20px]
                        flex items-center justify-center
                        rounded-2xl
                        shadow-shadow-soft
                        hover:scale-110 
                        hover:text-secondary
                        active:scale-95      
                    `}
                    onClick={handleClickUpload}
                >
                <i className="fa-solid fa-upload w-[20px] h-[20px]"></i>
                </button>
                <button className='absolute top-0 right-0 text-l bg-transparent text-primary-dark hover:text-secondary' 
                        onClick={onClose}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </>
        
        
    )
}
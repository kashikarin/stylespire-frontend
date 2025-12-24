import { useState } from "react"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"
import { StyleBoardMenu } from "./StyleBoardMenu"

export function StyleBoardCanvas({ 
    backgrounds, 
    loadMore, 
    loadingBgs, 
    background, 
    selectBackground,
    openModal
}){
    const [isBgBarOpen, setIsBgBarOpen] = useState(false)
    const [isSBMenuOpen, setIsSBMenuOpen] = useState(false)
    const DEFAULT_CANVAS_BACKGROUND = '/imgs/bgs/studio.jpg'
    const displayBackground =
        background || DEFAULT_CANVAS_BACKGROUND
    return(
        <main 
            className="
                relative 
                w-full 
                h-full 
                p-4
            "
            style={{
                    backgroundImage: `url(${displayBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
            }}
        >
            <div className="relative">
                {/* background part */}
                <BackgroundIconBtn 
                    handleMouseEnter={() => setIsBgBarOpen(true)} 
                />
                {isBgBarOpen && <BackgroundBar 
                    backgrounds={backgrounds}
                    selectBackground={(bg) =>{
                        selectBackground(bg)
                        setIsBgBarOpen(false)
                    }}
                    onLoadMore={loadMore}
                    loading={loadingBgs}
                    onClose={() => setIsBgBarOpen(false)}
                />}
                {/* SB menu part */}
                <StyleBoardMenu openModal={openModal} />
            </div>
            
        </main>

    )
}
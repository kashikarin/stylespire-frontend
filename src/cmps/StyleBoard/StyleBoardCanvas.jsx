import { useState } from "react"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"

export function StyleBoardCanvas({ 
    backgrounds, 
    loadMore, 
    loadingBgs, 
    background, 
    selectBackground 
}){
    const [isBgBarOpen, setIsBgBarOpen] = useState(false)
    const DEFAULT_CANVAS_BACKGROUND = '/imgs/bgs/studio.jpg'
    const displayBackground =
        background || DEFAULT_CANVAS_BACKGROUND
        console.log("🚀 ~ StyleBoardCanvas ~ background:", background)
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
                <BackgroundIconBtn handleMouseEnter={() => setIsBgBarOpen(true)} />
                {isBgBarOpen && <BackgroundBar 
                    backgrounds={backgrounds}
                    selectBackground={selectBackground}
                    onLoadMore={loadMore}
                    loading={loadingBgs}
                    onClose={() => setIsBgBarOpen(false)}
                />}
            </div>
            
        </main>

    )
}
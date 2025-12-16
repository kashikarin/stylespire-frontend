import { useState } from "react"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"

export function StyleBoardCanvas({ backgrounds, loadMore, loadingBgs }){
    const [isBgBarOpen, setIsBgBarOpen] = useState(false)
    const background = backgrounds[Math.floor(Math.random() * backgrounds.length)] || '/imgs/bgs/unique.jpg'
    const [bg, setBg] = useState(background)    
    
    return(
        <main 
            className="
                relative 
                w-full 
                h-full 
                p-4
            "
            style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
            }}
        >
            <div className="relative">
                <BackgroundIconBtn handleMouseEnter={() => setIsBgBarOpen(true)} />
                {isBgBarOpen && <BackgroundBar 
                    backgrounds={backgrounds}
                    onSelect={setBg}
                    onLoadMore={loadMore}
                    loading={loadingBgs}
                    onClose={() => setIsBgBarOpen(false)}
                />}
            </div>
            
        </main>

    )
}
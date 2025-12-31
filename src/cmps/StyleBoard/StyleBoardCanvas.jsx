import { useState } from "react"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"
import { StyleBoardMenu } from "./StyleBoardMenu"
import CanvasBoard from "./CanvasBoard"
import { ReactSVG } from "react-svg"

export function StyleBoardCanvas({ 
    ref,
    backgrounds, 
    loadMore, 
    loadingBgs, 
    background, 
    selectBackground,
    openModal,
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
        >
            <CanvasBoard ref={ref} background={displayBackground} />
                <div className="flex justify-between w-full z-20">
                    <div className="flex flex-col gap-1 z-20 items-center">
                        <div className="relative">
                            <BackgroundIconBtn 
                                handleClick={() => setIsBgBarOpen(true)} 
                            />
                            {isBgBarOpen && <BackgroundBar 
                                backgrounds={backgrounds}
                                selectBackground={(bg) =>{
                                    ref.current?.setBackground(bg)
                                    setIsBgBarOpen(false)
                                }}
                                onLoadMore={loadMore}
                                loading={loadingBgs}
                                onClose={() => setIsBgBarOpen(false)}
                            />}
                        </div>
                        <button 
                            className="
                                flex items-center justify-center
                                h-10 w-10 z-20
                                cursor-pointer
                                bg-white/40
                                rounded-lg
                                hover:bg-white/60
                            "
                            onClick={ref.current?.undo}
                        >
                            <ReactSVG src='/svgs/undo-icon.svg' />
                        </button>
                        <button 
                            className="
                                flex items-center justify-center
                                h-10 w-10 z-20
                                cursor-pointer
                                bg-white/40
                                rounded-lg
                                hover:bg-white/60
                            "
                            onClick={ref.current?.redo}
                        >
                            <ReactSVG src='/svgs/redo-icon.svg' className='scale-x-[-1]'/>
                        </button>
                        <button 
                            className="
                                flex items-center justify-center 
                                h-10 w-10
                                cursor-pointer
                                bg-white/40
                                rounded-lg
                                hover:bg-white/60
                            "
                            
                        >

                        </button>

                    </div>
                    
            {/* SB menu part */}
                <StyleBoardMenu openModal={openModal} />
                {/* background part */}
            </div> 
        </main>

    )
}
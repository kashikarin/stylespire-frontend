import { useState } from "react"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"
import { StyleBoardMenu } from "./StyleBoardMenu"
import { CanvasToolsColumn } from "./CanvasToolsColumn"
import { BoardOptionsColumn } from "./BoardOptionsColumn"
import CanvasBoard from "./CanvasBoard"
import { ReactSVG } from "react-svg"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { breakpoints } from "../../util/breakpoints"

export function StyleBoardCanvas({ 
    ref,
    backgrounds, 
    loadMore, 
    loadingBgs, 
    background, 
    selectBackground,
    openModal,
    isMobile,
    board,
    onSaveBoard
}){
    const [isBgBarOpen, setIsBgBarOpen] = useState(false)
    const [isSBMenuOpen, setIsSBMenuOpen] = useState(false)
    
    // Breakpoints for responsive columns
    const showBoardOptions = useMediaQuery(breakpoints.veryWide) // >= 1530px
    const showToolsColumn = useMediaQuery(breakpoints.extremelyWide) // >= 1650px
    
    const DEFAULT_CANVAS_BACKGROUND = '/imgs/bgs/studio.jpg'
    const displayBackground = background || DEFAULT_CANVAS_BACKGROUND
    
    // Tools should only appear in overlay when NOT in right column
    const showToolsOverlay = !showToolsColumn
    
    return(
        <div className="flex w-full h-full">
            {/* Canvas container with optional overlay tools */}
            <div className="relative flex-1 w-full h-full">
                {showToolsOverlay && (
                    <div 
                        className={`absolute z-20 flex flex-row justify-between items-start ${isMobile ? 'top-2 left-2 right-2' : 'top-4 left-4 right-4'}`} 
                        style={{ pointerEvents: 'none' }}
                    >
                        <div className={`flex gap-1 ${isMobile ? 'flex-row items-center' : 'flex-col'}`}>
                            <div className="relative" style={{ pointerEvents: 'auto' }}>
                                <BackgroundIconBtn 
                                    handleClick={() => setIsBgBarOpen(true)} 
                                    isMobile={isMobile}
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
                                    isMobile={isMobile}
                                />}
                            </div>
                            <button 
                                title="Undo (Ctrl+Z)"
                                className={`
                                    flex items-center justify-center cursor-pointer rounded-lg
                                    ${isMobile 
                                        ? 'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'  
                                        : 'h-10 w-10 bg-white/80 hover:bg-white shadow-sm'
                                    }
                                `}
                                style={{ pointerEvents: 'auto' }}
                            onClick={() => ref.current?.undo()}
                        >
                            <ReactSVG 
                                src='/svgs/undo-icon.svg'
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', isMobile ? '20' : '24')
                                    svg.setAttribute('height', isMobile ? '20' : '24')
                                }}
                            />
                        </button>
                        
                        {/* Redo button */}
                        <button 
                            title="Redo (Ctrl+Shift+Z)"
                            className={`
                                flex items-center justify-center cursor-pointer rounded-lg
                                ${isMobile 
                                    ? 'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'  
                                    : 'h-10 w-10 bg-white/80 hover:bg-white shadow-sm'
                                }
                            `}
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => ref.current?.redo()}
                        >
                            <div className="scale-x-[-1]">
                                <ReactSVG 
                                    src='/svgs/undo-icon.svg'
                                    beforeInjection={(svg) => {
                                        svg.setAttribute('width', isMobile ? '20' : '24')
                                        svg.setAttribute('height', isMobile ? '20' : '24')
                                    }}
                                />
                            </div>
                        </button>
                        <button
                            title="Delete selected item (Del)"
                            className={`
                                flex items-center justify-center cursor-pointer rounded-lg
                                ${isMobile  ? 'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'  
                                    : 'h-10 w-10 bg-white/80 hover:bg-white shadow-sm'
                                }
                            `}
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => ref.current?.deleteSelected()}
                        >
                             <ReactSVG src='/svgs/trash-icon.svg'
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', isMobile ? '20' : '24')
                                    svg.setAttribute('height', isMobile ? '20' : '24')
                                }}
                             />
                        </button>
                        <button
                            title="Bring to front (Ctrl+])"
                            className={`
                                flex items-center justify-center cursor-pointer rounded-lg
                                ${isMobile  ? 'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'  
                                    : 'h-10 w-10 bg-white/80 hover:bg-white shadow-sm'
                                }
                            `}
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => ref.current?.bringSelectedToFront()}
                        >
                             <ReactSVG src='/svgs/bring-front-icon.svg'
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', isMobile ? '20' : '24')
                                    svg.setAttribute('height', isMobile ? '20' : '24')
                                }}
                             />
                        </button>    
                        <button
                            title="Send to back (Ctrl+[)"
                            className={`
                                flex items-center justify-center cursor-pointer rounded-lg
                                ${isMobile  ? 'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'  
                                    : 'h-10 w-10 bg-white/80 hover:bg-white shadow-sm'
                                }
                            `}
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => ref.current?.bringSelectedBack()}
                        >
                             <ReactSVG src='/svgs/bring-back-icon.svg'
                                beforeInjection={(svg) => {
                                    svg.setAttribute('width', isMobile ? '20' : '24')
                                    svg.setAttribute('height', isMobile ? '20' : '24')
                                }}
                             />
                        </button>    
                        </div>
                        {!showBoardOptions && (
                            <StyleBoardMenu openModal={openModal} isMobile={isMobile}/>
                        )}
                    </div>
                )}
                
                <CanvasBoard ref={ref} background={displayBackground} isMobile={isMobile}/>
            </div>
            
            {/* Right-side columns */}
            {showToolsColumn && (
                <CanvasToolsColumn 
                    canvasRef={ref}
                    isBgBarOpen={isBgBarOpen}
                    setIsBgBarOpen={setIsBgBarOpen}
                    backgrounds={backgrounds}
                    loadMore={loadMore}
                    loadingBgs={loadingBgs}
                    onClose={() => setIsBgBarOpen(false)}
                    BackgroundIconBtn={BackgroundIconBtn}
                    BackgroundBar={BackgroundBar}
                />
            )}
            
            {showBoardOptions && (
                <BoardOptionsColumn 
                    openModal={openModal}
                    board={board}
                    onSaveBoard={onSaveBoard}
                />
            )}
        </div>

    )
}
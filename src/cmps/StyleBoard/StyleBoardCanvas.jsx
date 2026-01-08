import { useMediaQuery } from "../../hooks/useMediaQuery"
import { breakpoints } from "../../util/breakpoints"
import { StyleBoardMenu } from "./StyleBoardMenu"
import { CanvasToolsColumn } from "./CanvasToolsColumn"
import { BoardOptionsColumn } from "./BoardOptionsColumn"
import CanvasBoard from "./CanvasBoard"
import { useCanvasOverlayActions } from '../../hooks/useCanvasOverlayActions'
import { CanvasOverlayTools } from './CanvasOverlayTools'
import { useCanvasBackgroundBar } from "../../hooks/useCanvasBackgroundBar"

export function StyleBoardCanvas({ 
    canvasRef,
    backgrounds, 
    loadMore, 
    loadingBgs, 
    background,
    isMobile,
    onSaveClick,
    onSwitchClick,
    onSave
}){
    const actions = useCanvasOverlayActions(canvasRef)
    const bgBar = useCanvasBackgroundBar(canvasRef)
    
    // Breakpoints for responsive columns
    const showBoardOptions = useMediaQuery(breakpoints.veryWide) // >= 1530px
    const showToolsColumn = useMediaQuery(breakpoints.extremelyWide) // >= 1650px
    
    // Tools should only appear in overlay when NOT in right column
    const showToolsOverlay = !showToolsColumn
    
    const DEFAULT_CANVAS_BACKGROUND = '/imgs/bgs/studio.jpg'
    const displayBackground = background || DEFAULT_CANVAS_BACKGROUND
    
    return(
        <div className="flex w-full h-full">
            {/* Canvas container with optional overlay tools */}
            <div className="relative flex-1 w-full h-full">
                {showToolsOverlay && (
                    <div 
                        className={`
                            absolute z-20 
                            flex flex-row justify-between items-start 
                            ${isMobile ? 
                                'top-2 left-2 right-2' 
                                : 'top-4 left-4 right-4'}
                        `} 
                        style={{ pointerEvents: 'none' }}
                    >
                        <CanvasOverlayTools 
                            actions={actions} 
                            isMobile={isMobile}
                        />
                        {!showBoardOptions && (
                            <StyleBoardMenu 
                                onSaveClick={onSaveClick}
                                onSwitchClick={onSwitchClick}
                                isMobile={isMobile}
                            />
                        )}
                    </div>
                )}
                
                <CanvasBoard 
                    ref={canvasRef} 
                    background={displayBackground} 
                    isMobile={isMobile}
                />
            </div>
            
            {/* Right-side columns */}
            {showToolsColumn && (
                <CanvasToolsColumn 
                    canvasRef={canvasRef}
                    bgBar={bgBar}
                    backgrounds={backgrounds}
                    loadMore={loadMore}
                    loadingBgs={loadingBgs}
                />
            )}
            
            {showBoardOptions && (
                <BoardOptionsColumn 
                    onSave={onSave}
                />
            )}
        </div>
    )
}
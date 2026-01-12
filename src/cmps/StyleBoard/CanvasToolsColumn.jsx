import { ReactSVG } from "react-svg"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { BackgroundBar } from "./BackgroundBar"

export function CanvasToolsColumn({ 
    canvasRef, 
    bgBar,
    backgrounds, 
    loadMore, 
    loadingBgs, 
}) {
    return (
        <div className="flex flex-col items-start gap-2 pl-3 pr-4 py-4 bg-primary-bg shrink-0">
            <div className="relative">
                <BackgroundIconBtn 
                    handleClick={bgBar.open} 
                    isMobile={false}
                />
                {bgBar.isOpen && (
                    <BackgroundBar 
                        backgrounds={backgrounds}
                        selectBackground={bgBar.selectBackground}
                        onLoadMore={loadMore}
                        loading={loadingBgs}
                        onClose={bgBar.close}
                        isMobile={false}
                        position="left"
                    />
                )}
            </div>

            <button 
                title="Undo (Ctrl+Z)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition shrink-0"
                onClick={() => canvasRef.current?.undo()}
            >
                <ReactSVG 
                    src='/svgs/undo-icon.svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '24')
                        svg.setAttribute('height', '24')
                    }}
                />
            </button>
            
            <button 
                title="Redo (Ctrl+Shift+Z)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition shrink-0"
                onClick={() => canvasRef.current?.redo()}
            >
                <div className="scale-x-[-1]">
                    <ReactSVG 
                        src='/svgs/undo-icon.svg'
                        beforeInjection={(svg) => {
                            svg.setAttribute('width', '24')
                            svg.setAttribute('height', '24')
                        }}
                    />
                </div>
            </button>

            <button
                title="Delete selected item (Del)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition shrink-0"
                onClick={() => canvasRef.current?.deleteSelected()}
            >
                <ReactSVG 
                    src='/svgs/trash-icon.svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '24')
                        svg.setAttribute('height', '24')
                    }}
                />
            </button>

            <button
                title="Bring to front (Ctrl+])"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition shrink-0"
                onClick={() => canvasRef.current?.bringSelectedToFront()}
            >
                <ReactSVG 
                    src='/svgs/bring-front-icon.svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '24')
                        svg.setAttribute('height', '24')
                    }}
                />
            </button>

            <button
                title="Send to back (Ctrl+[)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition shrink-0"
                onClick={() => canvasRef.current?.bringSelectedBack()}
            >
                <ReactSVG 
                    src='/svgs/bring-back-icon.svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', '24')
                        svg.setAttribute('height', '24')
                    }}
                />
            </button>
        </div>
    )
}

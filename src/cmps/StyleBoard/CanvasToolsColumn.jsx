import { ReactSVG } from "react-svg"

export function CanvasToolsColumn({ 
    canvasRef, 
    isBgBarOpen, 
    setIsBgBarOpen, 
    backgrounds, 
    loadMore, 
    loadingBgs, 
    onClose,
    BackgroundIconBtn,
    BackgroundBar 
}) {
    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-primary-bg w-[60px] shrink-0">
            <div className="relative">
                <BackgroundIconBtn 
                    handleClick={() => setIsBgBarOpen(true)} 
                    isMobile={false}
                />
                {isBgBarOpen && (
                    <BackgroundBar 
                        backgrounds={backgrounds}
                        selectBackground={(bg) => {
                            canvasRef.current?.setBackground(bg)
                            setIsBgBarOpen(false)
                        }}
                        onLoadMore={loadMore}
                        loading={loadingBgs}
                        onClose={onClose}
                        isMobile={false}
                        position="left"
                    />
                )}
            </div>

            <button 
                title="Undo (Ctrl+Z)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition"
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
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 hover:bg-[#407076]/20 shadow-sm transition"
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

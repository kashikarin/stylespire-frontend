import { BackgroundBar } from "./BackgroundBar"
import { BackgroundIconBtn } from "./BackgroundIconBtn"
import { CanvasActionButton } from "./CanvasActionButton"

export function CanvasOverlayTools({ 
    actions, 
    isMobile,
    bgBar, 
    backgrounds, 
    loadMore, 
    loadingBgs 
}) {
    return (
        <div className={`
            flex gap-1
            ${isMobile ? 
                'flex-row items-center' : 'flex-col'
            }`}
        >
            <div className="relative">
                <BackgroundIconBtn 
                    handleClick={bgBar.open} 
                    isMobile={isMobile}
                />
                {bgBar.isOpen && (
                    <BackgroundBar 
                        backgrounds={backgrounds}
                        selectBackground={bgBar.selectBackground}
                        onLoadMore={loadMore}
                        loading={loadingBgs}
                        onClose={bgBar.close}
                        isMobile={isMobile}
                        position="right"
                    />
                )}
            </div>
            {actions.map(action => (
                <CanvasActionButton 
                    key={action.id}
                    { ...action }
                    isMobile={isMobile}
                />
            ))}
        </div>
    )
}
import { CanvasActionButton } from "./CanvasActionButton"

export function CanvasOverlayTools({ actions, isMobile }) {
    return (
        <div className={`
            flex gap-1
            ${isMobile ? 
                'flex-row items-center' : 'flex-col'
            }`}
        >
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
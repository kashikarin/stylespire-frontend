import { ReactSVG } from "react-svg"

export function CanvasActionButton({ title, icon, onClick, isMobile, flip = false}){
    return (
        <button
            title={title}
            onClick={onClick}
            style={{ pointerEvents: 'auto' }}
            className={`
                flex items-center justify-center
                cursor-pointer 
                rounded-lg
                ${isMobile ? 
                    'h-8 w-8 bg-white border border-gray-200 hover:border-gray-300 shadow-md'
                    : 'h-10 w-10 bg-white/80 hover:bg-[#407076]/20 shadow-sm transition'
                }
            `}
        >
            <div className={flip ? 'scale-x-[-1]' : ''}>
                <ReactSVG
                    src={icon}
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', isMobile ? '20' : '24')
                        svg.setAttribute('height', isMobile ? '20' : '24')
                    }}
                />
            </div>
        </button>
    )
}

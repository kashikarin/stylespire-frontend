import { ReactSVG } from "react-svg"
import { useDropdownController } from "../../hooks/useDropdownController"


export function StyleBoardMenu({ onSaveClick, onSwitchClick, isMobile }){
    const {
        close,
        toggle,
        isDropdownOpen,
        buttonRef,
        dropdownRef
    } = useDropdownController()

    function handleMenuClick(e, mode){
        e.stopPropagation()
        mode === 'save' ? onSaveClick() : onSwitchClick()
        close()
    }

    return(
        <div 
            className="relative" 
            style={{ pointerEvents: 'auto' }}
        >
            <button 
                className={`
                    text-primary-dark
                    rounded-full
                    bg-transparent
                    px-0
                    hover:rotate-90
                    transition
                    flex items-center justify-center
                    cursor-pointer
                    z-20
                    narrow:px-2
                    ${isDropdownOpen ? 'rotate-90' : ''}
                `}
                onClick={toggle}
                ref={buttonRef}
                
            >
                <ReactSVG 
                    src='/svgs/three-dots.svg'
                    beforeInjection={(svg) => {
                        svg.setAttribute('width', isMobile ? '20' : '24')
                        svg.setAttribute('height', isMobile ? '20' : '24')
                    }}
                />
            </button>
            {isDropdownOpen && (
                <div
                    className={`     
                        absolute 
                        ${isMobile ? 'top-8 right-0' : 'top-10 right-2'}
                        text-sm
                        z-20
                        mt-2 py-1
                        bg-primary-bg 
                        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                        rounded-lg
                        overflow-hidden
                        min-w-[120px]
                    `}
                    ref={dropdownRef}
                >
                    <button 
                        className="
                            block
                             text-primary-dark 
                            px-3 py-2 m-0 
                            text-sm narrow:text-base
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                             hover:bg-slate-200
                            narrow:py-3

                        "
                        onClick={(e)=> handleMenuClick(e, 'save')}
                    >
                        Save Board
                    </button>
                    <div className="h-px bg-primary-dark-20" />
                    <button 
                        className="
                            block
                             text-primary-dark 
                            px-3 py-2 m-0 
                            text-sm narrow:text-base
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                            hover:bg-slate-200
                            narrow:py-3
                        "
                        onClick={(e)=> handleMenuClick(e, 'switch')}
                    >
                        Switch Board
                    </button>
                </div>
            )}
        </div>
    )
}
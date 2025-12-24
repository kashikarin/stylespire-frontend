import { ReactSVG } from "react-svg"
import { useDropdownController } from "../../hooks/useDropdownController"


export function StyleBoardMenu({ openModal }){
    const {
        close,
        toggle,
        isDropdownOpen,
        buttonRef,
        dropdownRef
    } = useDropdownController()

    function handleSaveBoardClick(e){
        e.stopPropagation()
        openModal()
        close()
    }

    return(
        <div 
            className="relative"
        >
            <button 
                className="
                    absolute top-2 right-2
                    text-primary-dark
                    rounded-full
                    bg-transparent
                    p-2
                    hover:rotate-90
                    transition
                    flex items-center justify-center
                    cursor-pointer
                "
                onClick={toggle}
                ref={buttonRef}
                
            >
                <ReactSVG src='/svgs/three-dots.svg'/>
            </button>
            {isDropdownOpen && (
                <div
                    className="
                        absolute right-6 top-14
                        text-sm
                        mt-2 py-1
                        bg-primary-bg 
                        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                        rounded-lg
                        overflow-hidden
                        min-w-[120px]
                    " 
                    ref={dropdownRef}
                >
                    <button 
                        className="
                            block
                             text-primary-dark 
                            px-3 pt-4 pb-3 m-0 
                            text-base 
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                             hover:bg-slate-200

                        "
                        onClick={handleSaveBoardClick}
                    >
                        Save Board
                    </button>
                    <div className="h-px bg-primary-dark-20" />
                    <button 
                        className="
                            block
                             text-primary-dark 
                            px-3 pt-4 pb-3 m-0 
                            text-base 
                            font-normal 
                            tracking-tighter 
                            bg-transparent 
                            cursor-pointer 
                            text-left 
                            w-full 
                            relative
                            hover:bg-slate-200
                        "
                        onClick={close}
                    >
                        Switch Board
                    </button>
                </div>
            )}
        </div>
        
    )
}
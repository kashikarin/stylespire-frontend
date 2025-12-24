import { HorizontalCarousel } from "../HorizontalCarousel"
import { Portal } from "../Portal"

export function SwitchBoardModal({
    onClose,
    boards,
    isOpen,
    selectedBoardId,
    onSelectBoard
}){

    function handleSelectBoard(b) {
        onSelectBoard(b)
        onClose()
    }
    if (!isOpen) return null
    return(
        <Portal>
            <div 
                className="
                    fixed inset-0 z-40 
                    bg-black/40 backdrop-blur-sm
                    flex justify-center items-stretch
                    narrow:items-center
                " 
                onClick={onClose}
            >
                <div 
                    className="
                        bg-primary-bg 
                        w-full h-full 
                        flex flex-col 
                        p-5
                    
                        narrow:w-[500px] narrow:h-auto 
                        narrow:max-h-[60svh]
                        narrow:rounded-xl
                        narrow:shadow-lg
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    <header
                        className="
                            flex justify-between items-center mb-4                           
                         "
                    >
                        <span 
                            className='
                                text-lg font-semibold 
                            '
                        >
                            Select a board
                        </span>
                        <button
                            className='
                                bg-primary-dark
                                px-2 py-0
                                rounded-lg
                                text-lg
                                text-text-on-primary
                                hover:bg-primary-dark-80
                            '
                            onClick={onClose}
                        >
                            Exit
                        </button>
                    </header>
                    <div className="flex-1">
                        <HorizontalCarousel className='px-1'>
                            {
                                boards.map(b => {
                                    return (
                                        <div
                                            key={b._id} 
                                            className={`
                                                border border-primary-dark
                                                ${selectedBoardId === b._id ? 'border-2' : 'border'}
                                                shadow-shadow-soft
                                                rounded-xl
                                                bg-transparent
                                                p-3
                                                cursor-pointer
                                                flex flex-col gap-2 
                                                hover:bg-primary-dark-20
                                                transition duration-200
                                            `}
                                            onClick={()=>handleSelectBoard(b)}
                                        >
                                            <h3>{b.title}</h3>
                                            <p>Updated {new Date(b.updatedAt).toLocaleDateString()}</p>
                                        </div>
                                    )
                                })
                            }
                        </HorizontalCarousel>
                        </div>
                    </div>
                </div>
        </Portal>
    )
}
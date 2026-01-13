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
                        safe-pt safe-pb
                        w-full h-full 
                        flex flex-col 
                    
                        narrow:w-[500px] narrow:h-auto 
                        narrow:max-h-[60svh]
                        narrow:rounded-xl
                        narrow:shadow-lg
                        narrow:p-5
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Mobile: Top close button */}
                    <div className="flex justify-end p-4 pb-2 narrow:hidden">
                        <button
                            className="
                                w-8 h-8
                                flex items-center justify-center
                                text-2xl text-primary-dark
                                bg-transparent
                                transition
                            "
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Desktop: Header with title and exit button */}
                    <header className="hidden narrow:flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">
                            Select a board
                        </span>
                        <button
                            className="
                                bg-primary-dark
                                px-1 py-0
                                rounded-lg
                                text-text-on-primary
                                hover:bg-primary-dark-80
                            "
                            onClick={onClose}
                        >
                            Exit
                        </button>
                    </header>

                    {/* Mobile: Title */}
                    <div className="px-4 pb-4 narrow:hidden">
                        <h2 className="text-2xl font-semibold text-primary-dark">
                            Select a board
                        </h2>
                    </div>

                    {/* Boards list */}
                    <div className="flex-1 overflow-y-auto px-4 pb-6 narrow:px-0 narrow:pb-0">
                        {/* Mobile: Vertical grid */}
                        <div className="flex flex-col gap-3 narrow:hidden">
                            {boards.map(b => (
                                <button
                                    key={b._id}
                                    onClick={() => handleSelectBoard(b)}
                                    className={`
                                        w-full p-4
                                        text-left
                                        border rounded-xl
                                        ${selectedBoardId === b._id 
                                            ? 'border-2 border-primary-dark bg-[#407076]/10' 
                                            : 'border-primary-dark/30 bg-white/80'
                                        }
                                        hover:bg-[#407076]/20
                                        transition duration-200
                                        shadow-sm
                                    `}
                                >
                                    <h3 className="font-semibold text-base text-primary-dark mb-1">
                                        {b.title}
                                    </h3>
                                    <p className="text-sm text-primary-dark/60">
                                        Updated {new Date(b.updatedAt).toLocaleDateString()}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Desktop: Horizontal carousel */}
                        <div className="hidden narrow:block">
                            <HorizontalCarousel className="px-1">
                                {boards.map(b => (
                                    <div
                                        key={b._id}
                                        className={`
                                            border
                                            ${selectedBoardId === b._id ? 'border-2 border-primary-dark' : 'border-primary-dark'}
                                            shadow-shadow-soft
                                            rounded-xl
                                            bg-transparent
                                            p-2
                                            cursor-pointer
                                            flex flex-col
                                            hover:bg-primary-dark-20
                                            transition duration-200
                                            min-h-[60px]
                                        `}
                                        onClick={() => handleSelectBoard(b)}
                                    >
                                        <h3 className="text-sm font-medium mb-0.5">{b.title}</h3>
                                        <p className="text-xs text-primary-dark/70">
                                            Updated {new Date(b.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </HorizontalCarousel>
                        </div>
                    </div>
                </div>
                </div>
        </Portal>
    )
}
import { useState } from "react"
import { Portal } from "../cmps/Portal"
import { FavsSidebar } from "../cmps/StyleBoard/FavsSidebar"
import { MobileFavBar } from "../cmps/StyleBoard/MobileFavBar"
import { StyleBoardCanvas } from "../cmps/StyleBoard/StyleBoardCanvas"
import { useBoards } from "../hooks/useBoards"
import { useCanvasBackgrounds } from "../hooks/useCanvasBackgrounds"
import { useFavorites } from "../hooks/useFavorites"
import { useLockBodyScroll } from "../hooks/useLockBodyScroll"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { breakpoints } from "../util/breakpoints"
import { SaveBoardModal } from "../cmps/StyleBoard/SaveBoardModal"
import { SwitchBoardModal } from "../cmps/StyleBoard/SwitchBoardModal"

export function StyleBoard(){
    const isMobile = useMediaQuery(breakpoints.mobile)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState(null)
    const { favorites } = useFavorites()
    const { boards, board, updateBoardField, saveAndCreateNewBoard, onSelectBoard } = useBoards()
    const { 
        backgrounds, 
        loadMoreBackgrounds, 
        loading, 
        selectBackground
    } = useCanvasBackgrounds({
            selectedBackground: board?.selectedBackground, 
            onBackgroundChange: (bg)=> updateBoardField('selectedBackground', bg)
        }
    )
    
    useLockBodyScroll(true)

    async function handleSaveBoardAction(action) {
        const titleToSave = (action.title && action.title.length) ?
            action.title :
            board.title || 'Untitled board'
        
        switch(action.type){
            case 'save':
                await saveAndCreateNewBoard(titleToSave)
                break
            case 'switch':
                await updateBoardField('title', titleToSave)
                setIsSwitchModalOpen(true)
                break
            default: return 
        }

    }

    function handleMenuAction(mode) {
        setModalMode(mode)
        setIsModalOpen(true)
    }

    if (!board) return null

    return(
        <>
            <div className='full'>
            
                <div 
                    className="
                        narrow:h-[100dvh] 
                        w-full 
                        flex flex-col flex-1
                        overflow-hidden
                        narrow:flex-row
                    "
                >
                    <main 
                        className="
                            flex-1
                            relative
                            overflow-hidden
                            bg-primary-bg
                            order-1
                            h-[60dvh]
                            narrow:order-none
                            narrow:h-[100dvh]
                        "
                    >
                        <StyleBoardCanvas 
                            backgrounds={backgrounds} 
                            loadMore={loadMoreBackgrounds} 
                            loadingBgs={loading} 
                            background={board.selectedBackground} 
                            selectBackground={selectBackground}
                            openModal={(mode) => handleMenuAction(mode)}
                        />
                    </main>
                    {!isMobile && <aside 
                        className="
                            w-full h-[40dvh]
                            shrink-0
                            
                            border-t border-primary-dark
                            p-4 
                            bg-primary-bg
                            order-2
                            narrow:w-[260px] 
                            narrow:border-t-0 narrow:border-l narrow:border-primary-dark
                            narrow:h-full
                            narrow:order-none
                            narrow:overflow-y-auto
                        ">
                            <FavsSidebar favorites={favorites || []}/>
                    </aside>}
                </div>
                
            </div>
            <Portal>
                {isMobile && <MobileFavBar favorites={favorites || []}/>}
            </Portal>
            <SaveBoardModal 
                mode={modalMode}
                board={board}
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                onAction={(action) => handleSaveBoardAction(action)}
            />
            <SwitchBoardModal 
                onClose={()=>setIsSwitchModalOpen(false)}
                boards={boards}
                isOpen={isSwitchModalOpen}
                selectedBoardId={board._id}
                onSelectBoard={onSelectBoard}

            />
        </>
    )
}
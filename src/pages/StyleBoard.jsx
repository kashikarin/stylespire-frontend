import { useEffect, useRef, useState } from "react"
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
import { useIsLoggedInUser } from "../hooks/useIsLoggedInUser"

export function StyleBoard(){
    const isMobile = useMediaQuery(breakpoints.mobile)
    const canvasRef = useRef(null)
    
    const { loggedInUser } = useIsLoggedInUser()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState(null)
    
    const { favorites } = useFavorites()
    const { boards, board, updateCurrentBoard, saveAndCreateNewBoard, onSelectBoard } = useBoards()
    const { 
        backgrounds, 
        loadMoreBackgrounds, 
        loading, 
        selectBackground
    } = useCanvasBackgrounds({
            selectedBackground: board?.selectedBackground, 
            onBackgroundChange: onBackgroundChange
        }
    )
    
    useLockBodyScroll(true)

    useEffect(() => {
        const canvas = canvasRef.current
        return () => {
            if (canvas?.isDirty()){
                const canvasState = canvas.getCanvasState()
                updateCurrentBoard(canvasState) //save any unsaved changes
        }
      }
    }, [])

    function onBackgroundChange(bg) {
        canvasRef.current.setBackground(bg)
    }
    
    async function handleSaveNewBoard(newBoardTitle) {
        const titleToSave = newBoardTitle.length ? newBoardTitle : 'Untitled board'
        const canvasState = canvasRef.current.getCanvasState()
        
        if (canvasRef.current?.isDirty()) {
            await updateCurrentBoard({ ...canvasState, title: board.title })
            canvasRef.current?.marksClean()
        }
        
        await saveAndCreateNewBoard({ title: titleToSave })
    }
    
    async function handleSaveBoardAction(action) {
        const titleToSave = (action.title && action.title.length) ?
            action.title :
            board.title || 'Untitled board'  

        const canvasState = canvasRef.current.getCanvasState()

        if (canvasRef.current?.isDirty()){
            await updateCurrentBoard({ ...canvasState, title: titleToSave })
            canvasRef.current?.marksClean()
        }

        switch(action.type){
            case 'save':
                await saveAndCreateNewBoard({ title: titleToSave })
                break
            case 'switch':
                if (titleToSave !== board.title) await updateCurrentBoard({ title: titleToSave })
                setIsSwitchModalOpen(true)
                break
            default: return 
        }
    }

    function handleMenuAction(mode) {
        setModalMode(mode)
        setIsModalOpen(true)
    }

    // Handle favorite item selection - mobile only
    function handleItemSelect(imageUrl) {
        canvasRef.current?.addItemToCenter(imageUrl)
    }

    if (!loggedInUser || !board) return null

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
                            relative
                            overflow-hidden
                            bg-primary-bg
                            w-full
                            h-screen  // ✅ Simple: use full screen height
                            narrow:flex-1
                            narrow:h-auto
                        "
                        style={isMobile ? { height: 'calc(100vh - 120px)' } : undefined}  // ✅ Inline style for mobile

                    >
                        <StyleBoardCanvas 
                            ref={canvasRef}
                            backgrounds={backgrounds} 
                            loadMore={loadMoreBackgrounds} 
                            loadingBgs={loading} 
                            background={board.selectedBackground} 
                            selectBackground={selectBackground}
                            openModal={(mode) => handleMenuAction(mode)}
                            isMobile={isMobile}
                            board={board}
                            onSaveBoard={handleSaveNewBoard}
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
                            narrow:w-[200px] 
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
                {isMobile && <MobileFavBar favorites={favorites || []} onItemSelect={handleItemSelect}/>}
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
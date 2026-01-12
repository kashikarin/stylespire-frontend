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
    
    const { 
        boards, 
        board, 
        BOARD_MODE,
        handleBoardFlow,
        onSelectBoard 
    } = useBoards()
    
    const { favorites } = useFavorites()
    
    const { 
        backgrounds, 
        loadMoreBackgrounds, 
        loading, 
        selectBackground
    } = useCanvasBackgrounds({
            selectedBackground: board?.selectedBackground, 
            onBackgroundChange
        }
    )

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState(null)
    
    useLockBodyScroll(true)

    useEffect(() => {
        const canvas = canvasRef.current
        return () => {
            if (!canvas?.isDirty()) return
            const canvasState = canvas.getCanvasState()
            handleBoardFlow(BOARD_MODE.SWITCH, { canvasState })
                .catch(console.error) //save any unsaved changes
        }
    }, [])

    function onBackgroundChange(bg) {
        canvasRef.current?.setBackground(bg)
    }

    function openSaveModal(mode){
        setModalMode(mode)
        setIsSaveModalOpen(true)
    }
    
    async function onSave({ mode, title }) {
        const canvas = canvasRef.current

        const canvasState = canvas?.isDirty() ? 
            canvas.getCanvasState() : null

        await handleBoardFlow(mode, { title, canvasState })

        canvas?.marksClean()
        setIsSaveModalOpen(false)

        if (mode === BOARD_MODE.SWITCH) {
            setIsSwitchModalOpen(true)
        }
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
                            h-screen 
                            narrow:flex-1
                            narrow:h-auto
                        "
                        style={isMobile ? { height: 'calc(100vh - 120px)' } : undefined}  

                    >
                        <StyleBoardCanvas 
                            canvasRef={canvasRef}
                            backgrounds={backgrounds} 
                            loadMore={loadMoreBackgrounds} 
                            loadingBgs={loading} 
                            background={board.selectedBackground} 
                            isMobile={isMobile}
                            onSaveClick={() => openSaveModal(BOARD_MODE.SAVE)}
                            onSwitchClick={()=> openSaveModal(BOARD_MODE.SWITCH)}
                            onSave={onSave}
                            board={board}
                        />
                    </main>
                    {!isMobile && <aside 
                        className="
                            w-full h-[40dvh]
                            shrink-0
                            
                            border-t border-primary-dark
                            p-4 
                            pb-24
                            bg-primary-bg
                            order-2
                            narrow:w-[200px] 
                            narrow:border-t-0 narrow:border-l narrow:border-primary-dark
                            narrow:h-full
                            narrow:order-none
                            narrow:overflow-y-auto
                        ">
                            <FavsSidebar favorites={favorites || []} />
                    </aside>}
                </div>
            </div>
            <Portal>
                {isMobile && <MobileFavBar favorites={favorites || []} onItemSelect={handleItemSelect} />}
            </Portal>
            <SaveBoardModal 
                mode={modalMode}
                board={board}
                isOpen={isSaveModalOpen}
                onClose={()=>setIsSaveModalOpen(false)}
                onSubmit={({ title }) => onSave({ mode: modalMode, title })}
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
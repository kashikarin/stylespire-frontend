import { useEffect, useRef } from "react"
import { loadBoard, 
    updateBoard, 
    createBoard, 
    loadBoards, 
    selectBoard,
    resolveBoardImageSrc
} from "../store/actions/board.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useSelector } from "react-redux"

export function useBoards(){
    const { loggedInUser } = useIsLoggedInUser()    
    const board = useSelector(state => state.boardModule.board)
    const boards = useSelector(state => state.boardModule.boards)
    
    const hasInitializedRef = useRef(false)

    const BOARD_MODE = {
        SAVE: 'save',
        SWITCH: 'switch',
    }

    useEffect(()=>{
        if (!loggedInUser?._id) return
        if (hasInitializedRef.current) return
        hasInitializedRef.current = true
        initBoardData()
    }, [loggedInUser?._id])

    async function initBoardData(){
        try {
            await Promise.all([
                loadBoard(), 
                loadBoards()
            ])
        } catch (err) {
            console.error('Cannot load boards data', err)
        }   
    }

    async function saveCurrentBoard({ title, canvasState }) {
        if (!board) return  

        const finalTitle =
            title?.trim() || board.title || 'Untitled board'

        const boardToSave = {
            ...board,
            ...(canvasState || {}),
            title: finalTitle,
            updatedAt: Date.now(),
        }

        await updateBoard(boardToSave)
    }

    async function handleBoardFlow(mode, { title, canvasState }) {
        await saveCurrentBoard({ title, canvasState })

        if (mode === BOARD_MODE.SAVE) {
            await createBoard()
        }
    }
        
    async function onSelectBoard(boardToSelect){
        selectBoard(boardToSelect)
    }

    async function resolveImageSrc(src) {       
        return await resolveBoardImageSrc(src)
    }

    return {
        boards,
        board,
        BOARD_MODE,
        handleBoardFlow,
        onSelectBoard,
        resolveImageSrc
    }
}
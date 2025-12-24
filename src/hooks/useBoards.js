import { useEffect, useRef } from "react"
import { loadBoard, updateBoard, saveCurrentAndCreateNewBoard } from "../store/actions/board.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useSelector } from "react-redux"

export function useBoards(){
    const { loggedInUser } = useIsLoggedInUser()    
    const board = useSelector(state => state.boardModule.board)
    console.log('use boards -> board', board)
    const hasInitializedRef = useRef(false)
    
    useEffect(()=>{
        if (!loggedInUser?._id) return
        if (hasInitializedRef.current) return
        hasInitializedRef.current = true
        initBoard()
    }, [loggedInUser?._id])

    async function initBoard(){
        try {
            await loadBoard()
        } catch (err) {
            console.error('Cannot load a board', err)
        }   
    }

    async function saveAndCreateNewBoard(titleFromModal){
        await saveCurrentAndCreateNewBoard(board, titleFromModal)
    }

    async function updateBoardField(field, value){
        console.log('updateBoardField runs with', field, value)
        await updateBoard({
            ...board,
            [field]: value,
            updatedAt: Date.now()
        })
    }

    return {
        board,
        updateBoardField,
        saveAndCreateNewBoard
    }
}
import { useEffect, useRef } from "react"
import { loadBoard, updateBoard, saveCurrentAndCreateNewBoard, loadBoards, selectBoard } from "../store/actions/board.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useSelector } from "react-redux"

export function useBoards(){
    const { loggedInUser } = useIsLoggedInUser()    
    const board = useSelector(state => state.boardModule.board)
    const boards = useSelector(state => state.boardModule.boards)
    const hasInitializedRef = useRef(false)
    
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

    //save current board and create new empty board
    async function saveAndCreateNewBoard(updatedBoard){
        const boardToSave = {
            ...board, 
            ...updatedBoard,  
            updatedAt: Date.now()
        }
        await saveCurrentAndCreateNewBoard(boardToSave)
    }

    //update current board without creating a new one
    async function updateCurrentBoard(updatedFields = {}){
        const boardToUpdate = {
            ...board,
            ...updatedFields,   
            updatedAt: Date.now()
        }
        await updateBoard(boardToUpdate)
    }
        
    async function onSelectBoard(boardToSelect, canvasState = {}){
        if (Object.keys(canvasState).length > 0){
            await updateBoard(canvasState) //ensure any unsaved changes are saved
        }
        selectBoard(boardToSelect)
    }

    return {
        boards,
        board,
        updateCurrentBoard,
        saveAndCreateNewBoard,
        onSelectBoard
    }
}
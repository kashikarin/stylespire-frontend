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

    async function saveAndCreateNewBoard(titleFromModal){
        await saveCurrentAndCreateNewBoard(board, titleFromModal)
    }

    async function updateBoardField(field, value){
        await updateBoard({
            ...board,
            [field]: value,
            updatedAt: Date.now()
        })
    }

    function onSelectBoard(board){
        selectBoard(board)
    }

    return {
        boards,
        board,
        updateBoardField,
        saveAndCreateNewBoard,
        onSelectBoard
    }
}
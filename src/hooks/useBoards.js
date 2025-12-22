import { useEffect } from "react"
import { loadBoard, updateBoard } from "../store/actions/board.actions"
import { useIsLoggedInUser } from "./useIsLoggedInUser"
import { useSelector } from "react-redux"

export function useBoards(){
    const { loggedInUser } = useIsLoggedInUser()    
    const board = useSelector(state => state.boardModule.board)
    console.log('use boards -> board', board)
    
    useEffect(()=>{
        if (!loggedInUser?._id) return
        initBoard()
    }, [loggedInUser?._id])

    async function initBoard(){
        try {
            await loadBoard()

        } catch (err) {
            console.error('Cannot load a board', err)
        }   
    }

useEffect(() => {
  console.log('🔥 StyleBoard re-render, board ref:', board)
}, [board])

    async function updateBoardField(field, value){
        await updateBoard({
            ...board,
            [field]: value,
            updatedAt: Date.now()
        })
    }

    return {
        board,
        updateBoardField
    }
}
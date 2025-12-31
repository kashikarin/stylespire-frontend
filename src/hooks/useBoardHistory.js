import { pre } from "framer-motion/client"
import { useRef } from "react"

export function useBoardHistory(canvasState, setCanvasState){
    const transactionRef = useRef(null)
    const historyRef = useRef({
        past: [],
        future: []
    })

    const MAX_HISTORY = 30

    function snapshot(){
        return structuredClone(canvasState)
    }

    function beginTransaction(){
        if (transactionRef.current) return
        transactionRef.current = snapshot()
    }

    function commitTransaction(){
        if (!transactionRef.current) return
        const history = historyRef.current
        history.past.push(transactionRef.current)
        history.future = []
        transactionRef.current = null

        if (history.past.length > MAX_HISTORY) {
            history.past.shift()
        }
    }

    function atomicChange(fn){
        const history = historyRef.current
        history.past.push(snapshot())
        history.future = []
        fn()

        if (history.past.length > MAX_HISTORY) {
            history.past.shift()
        }
    }

    function undo(){
        const history = historyRef.current
        if (!history.past.length) return
        
        const prev = history.past.pop()
        history.future.push(snapshot())

        setCanvasState(prev) 
    }

    function redo(){
        const history = historyRef.current
        if (!history.future.length) return

        const next = history.future.pop()
        history.past.push(snapshot())

        setCanvasState(next)
    }
    
    return{
        beginTransaction, 
        commitTransaction, 
        atomicChange, 
        undo, 
        redo
    }
}
import { current } from "@reduxjs/toolkit"
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
        
        const current = snapshot()
        const prev = history.past.pop()

        setCanvasState(prev)
        history.future.push(current)
    }

    function redo(){
        const history = historyRef.current
        if (!history.future.length) return

        const current = snapshot()
        const next = history.future.pop()
        
        setCanvasState(next)
        history.past.push(current)
    }
    
    return{
        beginTransaction, 
        commitTransaction, 
        atomicChange, 
        undo, 
        redo
    }
}
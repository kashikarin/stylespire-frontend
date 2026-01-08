import { useState } from "react"

export function useCanvasBackgroundBar(canvasRef){
    const [isOpen, setIsOpen] = useState(false)

    function open(){
        setIsOpen(true)
    }

    function close(){
        setIsOpen(false)
    }   

    function selectBackground(bg){
        canvasRef.current?.setBackground(bg)
        setIsOpen(false)
    }
    
    return{
        isOpen,
        open,
        close,
        selectBackground
    }
}


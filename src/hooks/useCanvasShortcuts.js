import { useEffect } from "react"

export function useCanvasShortcuts({ 
    canvasState,
    setCanvasState,
    selectedId, 
    setSelectedId, 
    redo,
    undo,
    atomicChange
}){
    
    useEffect(() => {
        function handleKeyDown(e) {
            
            //if the user is typing something in a text input - do not run
            if (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable
            ) {
                return
            }
            
            //delete case
            if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
                e.preventDefault()
                atomicChange(() => {
                    setCanvasState(prev => ({
                        ...prev,
                        items: prev.items.filter(i => i.id !== selectedId)
                    }))
                })
                setSelectedId(null)
            }

            //bring to front case
            if ((e.metaKey || e.ctrlKey) && e.key === ']' && selectedId) {
                e.preventDefault()
                const item = canvasState.items.find(i => i.id === selectedId)
                if (!item) return
                atomicChange(() => {
                    setCanvasState(prev => ({
                        ...prev,
                        items: [...prev.items.filter(i => i.id !== selectedId), item]
                    }))
                })
            }

            //bring to back case
            if ((e.metaKey || e.ctrlKey) && e.key === '[' && selectedId) {
                e.preventDefault()
                const item = canvasState.items.find(i => i.id === selectedId)
                if (!item) return
                atomicChange(() => {
                    setCanvasState(prev => ({
                        ...prev, 
                        items: [ item, ...prev.items.filter(i => i.id !== selectedId)]
                    }))
                })
            }

            //undo case
            if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault()
                undo()
            }

            //redo case
            if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
                e.preventDefault()
                redo()
            }

        }
            
        window.addEventListener('keydown', handleKeyDown)
        
        return ()=> window.removeEventListener('keydown', handleKeyDown)

    }, [selectedId,
        setSelectedId,
        canvasState,
        setCanvasState,
        undo,
        redo,
        atomicChange
    ])
}
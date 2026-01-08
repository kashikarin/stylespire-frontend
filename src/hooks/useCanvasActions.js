export function useCanvasActions(canvasRef){
    return {
        undo: () => canvasRef.current?.undo(),
        redo: () => canvasRef.current?.redo(),
        deleteSelected: () => canvasRef.current?.deleteSelected(),
        bringToFront: () => canvasRef.current?.bringToFront(),
        sendToBack: () => canvasRef.current?.bringSelectedBack(),
    }
}
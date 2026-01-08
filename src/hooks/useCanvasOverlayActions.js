export function useCanvasOverlayActions(canvasRef) {
    return [
        {
            id: 'undo',
            title: 'Undo (Ctrl+Z)',
            icon: '/svgs/undo-icon.svg',
            onClick: () => canvasRef.current?.undo()
        },
        {
            id: 'redo',
            title: 'Redo (Ctrl+Shift+Z)',
            icon: '/svgs/undo-icon.svg',
            flip: true,
            onClick: () => canvasRef.current?.redo()
        },
        {
            id: 'delete',
            title: 'Delete selected item (Del)',
            icon: '/svgs/trash-icon.svg',
            onClick: () => canvasRef.current?.deleteSelected()
        },
        {
            id: 'bring-front',
            title: 'Bring to front (Ctrl+])',
            icon: '/svgs/bring-front-icon.svg',
            onClick: () => canvasRef.current?.bringSelectedToFront()
        },
        {
            id: 'send-back',
            title: 'Send to back (Ctrl+[)',
            icon: '/svgs/bring-back-icon.svg',
            onClick: () => canvasRef.current?.bringSelectedBack()
        }
    ]
}
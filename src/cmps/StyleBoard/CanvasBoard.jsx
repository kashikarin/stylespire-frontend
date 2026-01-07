import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useCanvasImages } from '../../hooks/useCanvasImages'
import { useCanvasShortcuts } from '../../hooks/useCanvasShortcuts'
import { useBoardHistory } from '../../hooks/useBoardHistory'
import { useBoards } from '../../hooks/useBoards'

function CanvasBoard({ background, isMobile }, ref){
    const containerRef = useRef()
    const canvasStateRef = useRef()
    const stageRef = useRef()
    const transformerRef = useRef()

    //on mount - set to signal - no changes to canvasState yet
    const isDirtyRef = useRef(false) 

    //local canvas state - items and selected background
    const [canvasState, setCanvasState] = useState({
        items: [],
        selectedBackground: null
    })    
    console.log("🚀 ~ CanvasBoard ~ canvasState:", canvasState)

    //canvas size state
    const [size, setSize] = useState({ width: 0, height: 0 })
    
    
    const VIRTUAL_WIDTH = 1200
    const VIRTUAL_HEIGHT = 800

    const [selectedId, setSelectedId] = useState(null)
    const imageRefs = useRef({})
    const { board } = useBoards()

    useEffect(() => {
        if (!board._id) return
        setCanvasState({ items: board.items || [], selectedBackground: background })
    }, [board?._id]) 

    useEffect(() => {
        canvasStateRef.current = canvasState
    }, [canvasState])
    
    // sync image resource with items' changes
    const { imagesBySrc, backgroundImage } = useCanvasImages(canvasState.items, canvasState.selectedBackground)

    //getting history-related functions
    const { 
        undo, 
        redo, 
        atomicChange, 
        beginTransaction, 
        commitTransaction 
    } = useBoardHistory(canvasState, setCanvasState)

    //register to canvas shortcuts 
    useCanvasShortcuts({
        canvasState,
        setCanvasState,
        selectedId,
        setSelectedId,
        undo,
        redo,
        atomicChange
    })
    
    //setting the canvas sizes
    useEffect(()=>{
        if (!containerRef.current) return

        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect
            setSize({ width, height })
        })

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [])
    
    // Calculate scale for coordinate conversion - never exceed 1
    const scale = Math.min(size.width / VIRTUAL_WIDTH, size.height / VIRTUAL_HEIGHT, 1)
    
    // Use smaller of container size or virtual size to prevent overflow
    const stageWidth = Math.min(size.width, VIRTUAL_WIDTH)
    const stageHeight = Math.min(size.height, VIRTUAL_HEIGHT)
    
    // For mobile: calculate dimensions maintaining 3:2 aspect ratio
    const mobileStageWidth = isMobile ? Math.min(size.width, VIRTUAL_WIDTH) : stageWidth
    const mobileStageHeight = isMobile ? (mobileStageWidth / VIRTUAL_WIDTH) * VIRTUAL_HEIGHT : stageHeight

    //setting transformer on selected item
    useEffect(() => {
        const transformer = transformerRef.current
        if (!transformer) return

        const node = imageRefs.current[selectedId]

        if (node) {
            transformer.nodes([node])
            transformer.getLayer().batchDraw()
        } else {
            transformer.nodes([])
            transformer.getLayer().batchDraw()
        }
    }, [selectedId])

    //container accepts droped items - addItem
    function handleDrop(e){
        e.preventDefault()

        const src = e.dataTransfer.getData('image-src')
        if (!src) return

        // Get rect from the actual Stage canvas, not container
        const stage = stageRef.current
        if (!stage) return
        
        const stageRect = stage.container().getBoundingClientRect()

        const x = (e.clientX - stageRect.left) / scale
        const y = (e.clientY - stageRect.top) / scale
        
        const itemWidth = 200
        const itemHeight = 200

        atomicChange(()=>{
            const newItem = {
                id: crypto.randomUUID(),
                src,
                x: x - (itemWidth / 2),
                y: y - (itemHeight / 2),
                width: itemWidth,
                height: itemHeight,
                rotation: 0
            }
            setCanvasState(prev => ({
                ...prev,
                items: [ ...prev.items, newItem]
            }))
        })

        isDirtyRef.current = true
    }

    function setBackground(bg) {
        atomicChange(()=>{
            setCanvasState(prev => ({
                ...prev,
                selectedBackground: bg
            }))
        })
        isDirtyRef.current = true
    }

    function getCanvasState(){
        return canvasStateRef.current
    }

    function isDirty(){
        return isDirtyRef.current
    }

    function marksClean(){
        isDirtyRef.current = false
    }
    
    function addItemToCenter(imageUrl) {
        const centerX = VIRTUAL_WIDTH / 2
        const centerY = VIRTUAL_HEIGHT / 2
        const itemWidth = 200
        const itemHeight = 200  

        atomicChange(()=>{
            const newItem = {
                id: crypto.randomUUID(),
                src: imageUrl,
                x: centerX - (itemWidth / 2),
                y: centerY - (itemHeight / 2),
                width: itemWidth,
                height: itemHeight,
                rotation: 0
            }
            setCanvasState(prev => ({
                ...prev,
                items: [ ...prev.items, newItem]
            }))
        })
        isDirtyRef.current = true   
    }

    function deleteSelected() {
        if (!selectedId) return
        
        atomicChange(() => {
            setCanvasState(prev => ({
                ...prev,
                items: prev.items.filter(i => i.id !== selectedId)
            }))
        })
        setSelectedId(null)
        isDirtyRef.current = true
    }

    function bringSelectedBack(){
        if (!selectedId) return
        const item = canvasState.items.find(i => i.id === selectedId)  
        atomicChange(() => {
            setCanvasState(prev => ({
                ...prev, 
                items: [ item, ...prev.items.filter(i => i.id !== selectedId)]
            }))
        })
    }
    
    function bringSelectedToFront(){
        if (!selectedId) return
        const item = canvasState.items.find(i => i.id === selectedId)
        atomicChange(() => {
            setCanvasState(prev => ({
                ...prev,
                items: [...prev.items.filter(i => i.id !== selectedId), item]
            }))
        })
    }


    useImperativeHandle(ref, () => ({
        undo,
        redo,
        setBackground,
        getCanvasState,
        isDirty,
        marksClean,
        addItemToCenter,
        deleteSelected,
        bringSelectedToFront,
        bringSelectedBack
    }))

    return(
        <div 
            ref={containerRef} 
            className={`
                absolute inset-0 
                ${isMobile ? 'flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100' : ''}
            `}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}    
        >
            {(size.width > 0 && size.height > 0) && (
                <div style={{ 
                    position: 'relative', 
                    bottom: isMobile ? '90px' : '0px',
                    width: isMobile ? `${mobileStageWidth}px` : '100%',
                    height: isMobile ? `${mobileStageHeight}px` : '100%'
                }}>
                    <Stage 
                        ref={stageRef}
                        width={isMobile ? mobileStageWidth : stageWidth} 
                        height={isMobile ? mobileStageHeight : stageHeight}
                        style={{ display: 'block' }}
                        onClick={(e) => {
                            // If we clicked on an item, the item's onClick will handle selection
                            // This only runs if the item didn't stop propagation
                            const clickedOnTransformer = e.target.getClassName() === 'Transformer'
                            if (clickedOnTransformer) return
                            
                            const clickedNode = e.target
                            const isItem = Object.values(imageRefs.current).includes(clickedNode)
                            
                            if (!isItem) {
                                setSelectedId(null)
                            }
                        }}
                        onTap={(e) => {
                            const tappedOnTransformer = e.target.getClassName() === 'Transformer'
                            if (tappedOnTransformer) return
                            
                            const tappedNode = e.target
                            const isItem = Object.values(imageRefs.current).includes(tappedNode)
                            
                            if (!isItem) {
                                setSelectedId(null)
                            }
                        }}
                    >
                        <Layer>
                            {backgroundImage && <KonvaImage 
                                image={backgroundImage}
                                width={isMobile ? mobileStageWidth : stageWidth}
                                height={isMobile ? mobileStageHeight : stageHeight}
                            />} 
                        </Layer>
                        <Layer>
                            {canvasState.items.map(item => {
                                if (!item || !item.src) return null

                                const img = imagesBySrc[item.src]
                                if (!img) return null

                                return(
                                    <KonvaImage 
                                        key={item.id}
                                        ref={node => imageRefs.current[item.id] = node}
                                        image={img}
                                        x={item.x * scale}
                                        y={item.y * scale}
                                        width={item.width * scale}
                                        height={item.height * scale}
                                        rotation={item.rotation || 0}
                                        draggable
                                        onDragStart={beginTransaction}
                                        onDragEnd={(e) => {
                                            const node = e.target
                                            setCanvasState(prev => ({
                                                ...prev,
                                                items: prev.items.map(i => i.id === item.id ?
                                                        { ...i, x: node.x() / scale, y: node.y() / scale } : i
                                                    )
                                            }))
                                            
                                            isDirtyRef.current = true
                                            commitTransaction()
                                        }}
                                        onTransformStart={beginTransaction}
                                        onTransformEnd={(e) => {
                                            const node = e.target

                                            const scaleX = node.scaleX()
                                            const scaleY = node.scaleY()

                                            const updatedItem = {
                                                ...item,
                                                width: Math.max(20, (node.width() * scaleX) / scale),
                                                height: Math.max(20, (node.height() * scaleY) / scale),
                                                x: node.x() / scale,
                                                y: node.y() / scale,
                                                rotation: node.rotation()
                                            }

                                            node.scaleX(1)
                                            node.scaleY(1)

                                            setCanvasState(prev => ({ ...prev, items: prev.items.map(i => i.id === item.id ?
                                                updatedItem : i)})
                                            )
                                            isDirtyRef.current = true
                                            commitTransaction()
                                        }}
                                        onClick={()=>{
                                            setSelectedId(item.id)
                                        }}
                                        onTap={()=>{
                                            setSelectedId(item.id)
                                        }}
                                    />
                 
                
                                    )
                            })}
                                    <Transformer 
                                        ref={transformerRef}
                                        rotateEnabled
                                        keepRatio={false}
                                        enabledAnchors={[
                                            'top-left',
                                            'top-center',
                                            'top-right',
                                            'middle-right',
                                            'bottom-right',
                                            'bottom-center',
                                            'bottom-left',
                                            'middle-left'
                                        ]}
                                    />
                        </Layer>
                    </Stage>
                </div>
            )}
        </div>
    )
}

export default forwardRef(CanvasBoard)
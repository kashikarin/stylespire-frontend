import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useCanvasImages } from '../../hooks/useCanvasImages'
import { useCanvasShortcuts } from '../../hooks/useCanvasShortcuts'
import { useBoardHistory } from '../../hooks/useBoardHistory'
import { useBoards } from '../../hooks/useBoards'

function CanvasBoard({ background }, ref){
    const containerRef = useRef()
    const canvasStateRef = useRef()
    console.log("🚀 ~ CanvasBoard ~ canvasStateRef:", canvasStateRef.current)
    const stageRef = useRef()
    const transformerRef = useRef()

    //on mount - set to signal - no changes to canvasState yet
    const isDirtyRef = useRef(false) 
    
    const [canvasState, setCanvasState] = useState({
        items: [],
        selectedBackground: null
    })    
    const [size, setSize] = useState({ width: 0, height: 0 })
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
        redo
    })
    
    //setting the canvas sizes
    useEffect(()=>{
        if (!containerRef.current) return

        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect
            setSize({ width, height })
        })

        observer.observe(containerRef.current)
    }, [])

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

        const rect = containerRef.current.getBoundingClientRect()

        

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        console.log('Drop position:', { x, y })
        console.log('Client position:', { x: e.clientX, y: e.clientY })
        console.log('Container rect:', rect)
        
        const itemWidth = 200
        const itemHeight = 200

        atomicChange(()=>{
            const newItem = {
                id: crypto.randomUUID(),
                src,
                x: x,
                y: y,
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

    useImperativeHandle(ref, () => ({
        undo,
        redo,
        setBackground,
        getCanvasState,
        isDirty,
        marksClean
    }))

    return(
        <div 
            ref={containerRef} 
            className='absolute inset-0'
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}    
        >
            {(size.width > 0 && size.height > 0) && (
                <Stage 
                    ref={stageRef}
                    width={size.width} 
                    height={size.height}
                    //disable selecting when clicking on empty area
                    onClick={(e) => {
                        const clickedOnEmpty = e.target === e.target.getStage()
                        if (clickedOnEmpty) {
                            setSelectedId(null)
                        }
                    }}
                    onTap={(e) => {
                        const tappedOnEmpty = e.target === e.target.getStage()
                        if (tappedOnEmpty) {
                            setSelectedId(null)
                        }
                    }}
                >
                    <Layer>
                        {backgroundImage && <KonvaImage 
                            image={backgroundImage}
                            width={size.width}
                            height={size.height}
                            //allow disabling transformer on stage clicks
                            listening={false}
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
                                    x={item.x}
                                    y={item.y}
                                    width={item.width}
                                    height={item.height}
                                    rotation={item.rotation || 0}
                                    draggable
                                    onDragStart={beginTransaction}
                                    onDragEnd={(e) => {
                                        const node = e.target
                                        setCanvasState(prev => ({
                                            ...prev,
                                            items: prev.items.map(i => i.id === item.id ?
                                                    { ...i, x: node.x(), y: node.y() } : i
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
                                            width: Math.max(20, node.width() * scaleX),
                                            height: Math.max(20, node.height() * scaleY),
                                            x: node.x(),
                                            y: node.y(),
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
                                    onClick={()=>setSelectedId(item.id)}
                                    onTap={()=>setSelectedId(item.id)}
                                />
                            )
                        })}
                        <Transformer 
                            ref={transformerRef}
                            rotateEnabled
                            keepRatio={true}
                            enabledAnchors={[
                                'top-left',
                                'top-right',
                                'bottom-left',
                                'bottom-right'
                            ]}
                        />
                    </Layer>
                </Stage>
            )}
        </div>
    )
}

export default forwardRef(CanvasBoard)
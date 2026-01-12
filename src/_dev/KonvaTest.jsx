import { useRef, useState, useEffect } from 'react'
import { Stage, Layer, Rect, Image as KonvaImage } from 'react-konva'

export function KonvaTest(){
    const stageRef = useRef()
    const [image, setImage] = useState(null)

    useEffect(() => {
      const img = new window.Image()
      img.src = '/imgs/test.jpg'
      img.onload = () => setImage(img)
    }, [])
    return(
        <div 
            className='
                w-[800px] h-[500px]
                bg-surface
                border-2 border-blue 
            '
        >

            <Stage 
                ref={stageRef}
                width={800} 
                height={500} 
                style={{ background: '#fff000'}}
 
            >
                <Layer>
                    <KonvaImage 
                        image={image}
                        x={50}
                        y={50}
                        width={200}
                        height={200}
                        draggable
                    /> 


                </Layer>
            </Stage>
    </div>
    )
}
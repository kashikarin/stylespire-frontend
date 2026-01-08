export function useCanvasLayout(size, isMobile){
    const VIRTUAL_CANVAS_WIDTH = 1200
    const VIRTUAL_CANVAS_HEIGHT = 800

    const scale = Math.min(
        size.width / VIRTUAL_CANVAS_WIDTH, 
        size.height / VIRTUAL_CANVAS_HEIGHT,
        1
    )

    const stageWidth = Math.min(size.width, VIRTUAL_CANVAS_WIDTH)
    const stageHeight = Math.min(size.height, VIRTUAL_CANVAS_HEIGHT)

    const mobileStageWidth = isMobile
        ? Math.min(size.width, VIRTUAL_CANVAS_WIDTH)
        : stageWidth

  const mobileStageHeight = isMobile
        ? (mobileStageWidth / VIRTUAL_CANVAS_WIDTH) * VIRTUAL_CANVAS_HEIGHT
        : stageHeight
    
    return{
        scale,
        stageWidth,
        stageHeight,
        mobileStageWidth,
        mobileStageHeight,
        VIRTUAL_CANVAS_WIDTH,
        VIRTUAL_CANVAS_HEIGHT
    }
}
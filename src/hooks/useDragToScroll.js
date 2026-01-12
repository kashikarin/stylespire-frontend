import { useEffect, useRef } from "react"

export function useDragToScroll() {
    const ref = useRef(null)

    useEffect(()=>{
        const el = ref.current
        if (!el) return

        let isDown = false
        let startX
        let scrollLeft

        function handleMouseDown(e) {
            isDown = true
            el.classList.add('dragging')
            startX = e.pageX - el.offsetLeft
            scrollLeft = el.scrollLeft
        }

        function handleMouseLeave() {
            isDown = false
            el.classList.remove('dragging')
        }

        function handleMouseUp() {
            isDown = false
            el.classList.remove('dragging')
        }

        function handleMouseMove(e) {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - el.offsetLeft
            const walk = (x - startX) * 1.5
            el.scrollLeft = scrollLeft - walk
        }

        el.addEventListener('mousedown', handleMouseDown)
        el.addEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseup', handleMouseUp)
        el.addEventListener('mousemove', handleMouseMove)   

        return () => {
            el.removeEventListener('mousedown', handleMouseDown)
            el.removeEventListener('mouseleave', handleMouseLeave)
            el.removeEventListener('mouseup', handleMouseUp)
            el.removeEventListener('mousemove', handleMouseMove)   
        }   


    }, [])

    return ref
}
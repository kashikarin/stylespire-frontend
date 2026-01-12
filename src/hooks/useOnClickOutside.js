import { useEffect } from "react"

export function useOnClickOutside(ref, onClose) {
    useEffect(()=>{
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) onClose(event)
        }

        function handleKey(e) {
            if (e.key === 'Escape') onClose(e);
        }

        document.addEventListener('mousedown', handleOutsideClick)
        document.addEventListener('keydown', handleKey)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleKey)
        }
    }, [ref, onclose])
}
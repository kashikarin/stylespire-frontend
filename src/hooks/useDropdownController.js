import { useEffect, useRef, useState } from "react"

export function useDropdownController({ withPosition = false } = {}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const buttonRef = useRef()
    const dropdownRef = useRef()
    const [coords, setCoords] = useState({})

    function updatePosition(){
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        setCoords({
            top: rect.bottom + window.scrollY + 8,
            right: window.innerWidth - rect.right - window.scrollX - 8,
        })
    }

    function open(){
        if (withPosition) updatePosition()
            setIsDropdownOpen(true)
    }

    function close(){
        setIsDropdownOpen(false)
    }

    function toggle(){
        if (!isDropdownOpen && withPosition) updatePosition()
        setIsDropdownOpen(prev => !prev)
    }

    useEffect(()=>{
        if (!isDropdownOpen) return

        function handleClickOutside(ev) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(ev.target) &&
                !buttonRef.current.contains(ev.target)
            ){
                close()
            }
        }

        function handleEsc(e) {
            if (e.key === 'Escape') close()
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEsc)

        if (withPosition) {
            window.addEventListener('resize', updatePosition)
            window.addEventListener('scroll', updatePosition)
        }

        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition)
        }

    }, [isDropdownOpen])



    return{
        isDropdownOpen,
        open, 
        close,
        toggle,
        buttonRef,
        dropdownRef,
        coords
    }
}
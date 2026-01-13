import { useEffect, useState } from "react"
import { Portal } from "../Portal"

export function SaveBoardModal({ 
    mode,
    board,
    isOpen,
    onClose,
    onSubmit
}){
    const [title, setTitle] = useState('')    
    const [error, setError] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(()=>{
        if (!isOpen) return
        setTitle(board?.title || '')
        setError('')
    }, [isOpen, board])

    async function handleSubmit(e) {
        e.preventDefault()
        setIsSaving(true)
        setError('')

        try {
            await onSubmit({ title: title.trim() })
            onClose()
        } catch(err) {
            setError(err.message || 'Failed to save board')  
        } finally {
            setIsSaving(false)
        }
    }

    if (!isOpen) return null

    return(
        <Portal>
            <div 
                className="
                    fixed inset-0 z-40 
                    bg-black/40 backdrop-blur-sm
                    flex justify-center items-stretch
                    narrow:items-center
                " 
                onClick={onClose}
            >
                <div 
                    className="
                        bg-primary-bg 
                        safe-pt safe-pb
                        w-full h-full 
                        flex flex-col 
                        p-5
                    
                        narrow:w-[400px] narrow:h-auto 
                        narrow:max-h-[60svh]
                        narrow:rounded-xl
                        narrow:shadow-lg
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    <header 
                        className="
                            flex justify-between items-center                           
                         ">
                            <h2 
                                className="
                                    text-lg font-semibold 
                                    mx-auto
                                "
                            >
                                {mode === 'save' ? 'Save board' : 'Save board before switching?'}
                            </h2>
                    </header>
                    <div className="flex-1">
                        <form onSubmit={handleSubmit}>
                            <label
                                htmlFor="board-title" 
                                className="text-sm font-medium text-primary-dark"
                            >
                                Board title
                                <input 
                                    id='board-title'
                                    type="text" 
                                    value={title} 
                                    name='title' 
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='My StyleBoard'
                                    autoFocus
                                    className='
                                        w-full
                                        rounded-lg
                                        border border-primary-dark
                                        bg-transparent
                                        px-3 py-2
                                        text-base
                                        text-primary-dark
                                        placeholder:text-primary-dark

                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-primary
                                        focus:border-transparent
                                        
                                        disabled:opacity-60
                                    '
                                />
                            </label>
                            <span className="text-xs text-gray-500">
                                Leave empty to use a default name
                            </span>
                            {error && (
                                <p className="text-sm text-red-600 mt-2">
                                    {error}
                                </p>
                            )}
                            <footer className="mt-6 flex justify-between gap-3">
                                <button
                                     className='
                                        rounded-md
                                        bg-primary-dark
                                        py-2 px-5
                                        text-text-on-primary
                                        text-sm font-medium

                                        hover:bg-primary-dark-80
                                        transition
                                        disabled:opacity-60
                                    '
                                    type="submit" 
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 
                                        mode === 'save' ? 'Save' : 'Save and Continue'
                                    }
                                </button>
                                <button 
                                    className='
                                        rounded-md
                                        bg-primary-dark
                                        py-2 px-4
                                        text-text-on-primary
                                        text-sm font-medium

                                        hover:bg-primary-dark-80
                                        transition
                                        disabled:opacity-60
                                    '
                                    type="button" 
                                    onClick={onClose}
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        </Portal>
    )
}
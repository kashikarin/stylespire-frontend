import { useState } from "react"

export function BoardOptionsColumn({ openModal, board, onSaveBoard }) {
    const [newBoardTitle, setNewBoardTitle] = useState('')
    const [showSaveForm, setShowSaveForm] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    async function handleSaveNewBoard(e) {
        e.preventDefault()
        setIsSaving(true)
        try {
            await onSaveBoard(newBoardTitle.trim())
            setNewBoardTitle('')
            setShowSaveForm(false)
        } catch (err) {
            console.error('Failed to save board:', err)
        } finally {
            setIsSaving(false)
        }
    }

    function cancelSave() {
        setNewBoardTitle('')
        setShowSaveForm(false)
    }

    return (
        <div className="flex flex-col gap-3 p-4 border-l border-primary-dark bg-primary-bg w-[200px] shrink-0">
            {/* Save New Board Section */}
            {!showSaveForm ? (
                <>
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-left
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => setShowSaveForm(true)}
                    >
                        Save as New Board
                    </button>
                    
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-left
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => openModal('switch')}
                    >
                        Switch Board
                    </button>
                </>
            ) : (
                <form onSubmit={handleSaveNewBoard} className="flex flex-col gap-1">
                    <div className="flex items-start justify-end -mb-1">
                        <button
                            type="button"
                            onClick={cancelSave}
                            disabled={isSaving}
                            className="
                                shrink-0 w-6 h-6
                                flex items-center justify-center
                                text-base
                                bg-transparent
                                text-primary-dark/60 hover:text-primary-dark
                                transition
                            "
                        >
                            ✕
                        </button>
                    </div>
                    <label className="text-xs font-medium text-primary-dark/70 -mt-0.5">
                        New Board Title
                    </label>
                    <input
                        type="text"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                        placeholder="My StyleBoard"
                        autoFocus
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark
                            border border-primary-dark/30 rounded-md
                            bg-white/50
                            focus:outline-none focus:ring-1 focus:ring-primary-dark focus:bg-white
                            transition
                        "
                    />
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="
                            w-full px-2 py-1.5
                            text-xs font-medium
                            border border-primary-dark/30 rounded-md
                            bg-primary-dark hover:bg-primary-dark/90
                            text-white
                            transition
                            disabled:opacity-60
                        "
                    >
                        {isSaving ? '...' : 'Save'}
                    </button>
                </form>
            )}
        </div>
    )
}

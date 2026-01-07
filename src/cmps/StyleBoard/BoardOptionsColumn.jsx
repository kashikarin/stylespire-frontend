import { useState } from "react"

// Internal helper component for form rendering
function BoardForm({ onSubmit, onCancel, label, buttonText, value, onChange, isSaving }) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col px-4 pt-0 pb-3 border-b border-primary-dark/20">
            <div className="flex items-start justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="
                        shrink-0 w-5 h-5
                        flex items-center justify-center
                        m-0
                        text-sm
                        bg-transparent
                        text-primary-dark/60 hover:text-primary-dark
                        transition
                    "
                >
                    ✕
                </button>
            </div>
            <label className="text-xs font-medium text-primary-dark/70 my-0">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="My StyleBoard"
                autoFocus
                className="
                    w-full px-2 py-1.5 
                    text-sm text-primary-dark
                    border border-primary-dark/30 rounded-md
                    bg-white/50
                    focus:outline-none focus:ring-1 focus:ring-primary-dark focus:bg-white
                    transition
                    mb-1.5
                "
            />
            <button
                type="submit"
                disabled={isSaving || !value.trim()}
                className="
                    w-full px-2 py-1.5
                    text-xs font-medium
                    border border-primary-dark/30 rounded-md
                    bg-primary-dark hover:bg-primary-dark/90
                    text-white
                    transition
                    disabled:opacity-60 disabled:cursor-not-allowed
                "
            >
                {isSaving ? '...' : buttonText}
            </button>
        </form>
    )
}

export function BoardOptionsColumn({ openModal, openSwitchModal, board, onSaveBoard }) {
    const [newBoardTitle, setNewBoardTitle] = useState('')
    const [showSaveForm, setShowSaveForm] = useState(false)
    const [showSwitchForm, setShowSwitchForm] = useState(false)
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

    async function handleSaveAndSwitch(e) {
        e.preventDefault()
        setIsSaving(true)
        try {
            await onSaveBoard(newBoardTitle.trim())
            setNewBoardTitle('')
            setShowSwitchForm(false)
            openSwitchModal()
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

    function cancelSwitch() {
        setNewBoardTitle('')
        setShowSwitchForm(false)
    }

    return (
        <div className="flex flex-col border-l border-primary-dark bg-primary-bg w-[200px] shrink-0">
            {/* Save New Board Form */}
            {showSaveForm && (
                <BoardForm
                    onSubmit={handleSaveNewBoard}
                    onCancel={cancelSave}
                    label="New Board Title"
                    buttonText="Save"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    isSaving={isSaving}
                />
            )}

            {/* Save Before Switch Form */}
            {showSwitchForm && (
                <BoardForm
                    onSubmit={handleSaveAndSwitch}
                    onCancel={cancelSwitch}
                    label="Save board before switching?"
                    buttonText="Save and continue"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    isSaving={isSaving}
                />
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 p-4">
                {!showSaveForm && !showSwitchForm && (
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-center
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => setShowSaveForm(true)}
                    >
                        Save Board
                    </button>
                )}
                
                {!showSwitchForm && (
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-center
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => setShowSwitchForm(true)}
                    >
                        Switch Board
                    </button>
                )}
            </div>
        </div>
    )
}

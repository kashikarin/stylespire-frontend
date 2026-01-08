import { useState } from "react"

// Internal helper component for form rendering
function BoardForm({ 
    label, 
    buttonText, 
    value, 
    onChange, 
    onSubmit, 
    onCancel, 
}) {
    return (
        <form 
            onSubmit={onSubmit} 
            className="flex flex-col px-4 pt-0 pb-3 border-b border-primary-dark/20">
            <div className="flex items-start justify-end">
                <button
                    type="button"
                    onClick={onCancel}
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
            <label 
                className="
                    text-xs font-medium text-primary-dark/70 
                    my-0
                "
            >
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
                disabled={!value.trim()}
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
                {buttonText}
            </button>
        </form>
    )
}

export function BoardOptionsColumn({ onSave }) {
    const [title, setTitle] = useState('')
    const [mode, setMode] = useState(null) 

    function closeForm() {
        setTitle('')
        setMode(null)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSave({ mode, title: title.trim() })
        closeForm()
    }

    return (
        <div 
            className="
                flex flex-col 
                border-l border-primary-dark 
                bg-primary-bg w-[200px] 
                shrink-0
            "
        >
            {/* Save New Board Form */}
            {mode && (
                <BoardForm
                    label={
                        mode === 'save' ?
                            "New Board Title" :
                            "Save board before switching?"
                    }
                    buttonText={
                        mode === 'save' ?
                            "Save" :
                            "Save and continue"
                    }
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                />
            )}

            {/* Save Before Switch Form */}
            {!mode && (
                <div className="flex flex-col gap-3 p-4">
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-center
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => setMode('save')}
                    >
                        Save Board
                    </button>
                    <button 
                        className="
                            w-full px-2 py-1.5 
                            text-sm text-primary-dark text-center
                            border border-primary-dark/30 rounded-md
                            bg-white/80 hover:bg-[#407076]/20
                            transition
                        "
                        onClick={() => setMode('switch')}
                    >
                        Switch Board
                    </button>
                </div>
            )}
        </div>
    )
}

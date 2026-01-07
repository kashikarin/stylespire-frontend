import { ReactSVG } from "react-svg"

export function FavProcessingOverlay({ isProcessing, isFailed, variant = 'desktop' }) {
    if (variant === 'mobile') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium">
                {isProcessing && (
                    <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                )}
                {!isProcessing && !isFailed && (
                    <ReactSVG 
                        src='/svgs/spinner.svg' 
                        className="w-6 h-6 animate-spin"
                    />
                )}
                {isFailed && (
                    <ReactSVG 
                        src='/svgs/exclamation-icon.svg' 
                        className="w-6 h-6"
                    />
                )}
            </div>
        )
    }

    // Desktop variant
    return (
        <div className="absolute inset-0 
            flex items-center justify-center
            bg-black/30 text-white text-sm font-medium"
        >
            {isProcessing && <div 
                className="
                    absolute inset-0 
                    animate-scan 
                    bg-gradient-to-b from-transparent via-white/40 to-transparent
                " 
            />}
            {!isProcessing && !isFailed && <ReactSVG 
                src='/svgs/spinner.svg' 
                className="w-10 h-10 animate-spin"
            />}
            {isFailed && <ReactSVG 
                src='/svgs/exclamation-icon.svg' 
                className="w-8 h-8"
            />}
        </div>
    )
}

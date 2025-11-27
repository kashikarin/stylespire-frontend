export function DotsIndicator({ slidesNum, currentIdx, maxDots = 7, onDotClick }) {
  let startIdx = Math.max(
    0,
    Math.min(currentIdx - 2, slidesNum - maxDots)
  )

  const dotsToRender = Math.min(slidesNum, maxDots)

  return (
    <div className="flex justify-center gap-2 mt-2 z-10">
      {Array.from({ length: dotsToRender }, (_, i) => {
        const slideIdx = startIdx + i
        return (
          <span
            key={slideIdx}
            className={
                `w-2 h-2 
                rounded-full 
                bg-primary-bg 
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                pointer-events-auto
                ml-0
                opacity-60
                hover:bg-white/70

                ${slideIdx === currentIdx ? "scale-125 opacity-100" : ""} 
                ${startIdx + (dotsToRender - 1) === slidesNum - 1? 
                    '' : 'w-1 h-1'}
                `}
            onClick={(e) => onDotClick(e, slideIdx)}
          />
        )
      })}
    </div>
  )
}

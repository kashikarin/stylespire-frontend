import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(()=>window.matchMedia(query).matches)
  
  useEffect(() => {
    const media = window.matchMedia(query)

    function handleMediaChange(){
      setMatches(media.matches)
    }

    media.addEventListener('change', handleMediaChange)
    
    return () => media.removeEventListener('change', handleMediaChange)
  }, [query])

  return matches
}

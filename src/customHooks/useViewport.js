import { useState, useEffect } from 'react'

export function useViewport() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = width <= 768
  const isTablet = width > 768 && width <= 1024
  const isDesktop = width > 1024
  const isWide = width > 1440
  
  let layout = 'mobile-layout'
  if (isTablet) layout = 'tablet-layout'
  else if (isDesktop) layout = 'desktop-layout'
  else if (isWide) layout = 'wide-layout'

  return { width, layout, isMobile, isTablet, isDesktop, isWide }
}

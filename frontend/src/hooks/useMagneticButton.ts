import { useCallback, useRef } from "react"

export function useMagneticButton<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const element = ref.current
    if (!element) return
    element.style.transform = "translate(0, 0)"
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

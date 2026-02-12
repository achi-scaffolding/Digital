"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}

/**
 * Returns scroll progress (0-100) after mount, or null during initial hydration.
 * This prevents hydration mismatch warnings when using inline styles.
 */
export function useScrollProgress(): number | null {
  const [progress, setProgress] = useState<number | null>(null)

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
    }

    calc()
    window.addEventListener("scroll", calc, { passive: true })
    window.addEventListener("resize", calc, { passive: true })

    return () => {
      window.removeEventListener("scroll", calc)
      window.removeEventListener("resize", calc)
    }
  }, [])

  return progress
}

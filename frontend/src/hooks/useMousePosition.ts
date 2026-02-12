"use client"

import { useEffect, useState, type RefObject } from "react"

type MousePosition = {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

export function useMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>
): MousePosition {
  const [pos, setPos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const nx = rect.width ? x / rect.width : 0.5
      const ny = rect.height ? y / rect.height : 0.5

      setPos({
        x,
        y,
        normalizedX: nx,
        normalizedY: ny,
      })

      el.style.setProperty("--mouse-x", `${x}px`)
      el.style.setProperty("--mouse-y", `${y}px`)
      el.style.setProperty("--mouse-nx", `${nx}`)
      el.style.setProperty("--mouse-ny", `${ny}`)
    }

    el.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      el.removeEventListener("mousemove", onMove)
    }
  }, [ref])

  return pos
}

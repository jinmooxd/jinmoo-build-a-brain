import { useEffect, useState } from 'react'

export function useScrollSection(sectionIds: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          const index = sectionIds.findIndex((id) => id === visible[0].target.id)
          if (index >= 0) setActiveIndex(index)
        }
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.25, 0.5, 0.75],
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeIndex
}

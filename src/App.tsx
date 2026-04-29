import { useEffect, useRef, useState } from 'react'
import { AttentionSpotlight } from './components/AttentionSpotlight'
import { BottleneckMeter } from './components/BottleneckMeter'
import { InattentionGame } from './components/InattentionGame'
import { MemoryLattice } from './components/MemoryLattice'
import { MemoryTest } from './components/MemoryTest'
import { ParticleStream } from './components/ParticleStream'
import { ProgressRail } from './components/ProgressRail'
import { SectionWrapper } from './components/SectionWrapper'
import { SynthesisPanel } from './components/SynthesisPanel'
import { useScrollSection } from './hooks/useScrollSection'

const sectionIds = ['sensory', 'bottleneck', 'inattention', 'spotlight', 'encoding', 'test', 'synthesis']

function App() {
  const [trackEverything, setTrackEverything] = useState(false)
  const activeSection = useScrollSection(sectionIds)
  const sectionScrollLock = useRef(false)

  useEffect(() => {
    const isInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName.toLowerCase()
      return (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        tag === 'button' ||
        target.isContentEditable
      )
    }

    const findNearestSectionIndex = () => {
      let closest = 0
      let closestDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id)
        if (!element) return
        const distance = Math.abs(element.getBoundingClientRect().top)
        if (distance < closestDistance) {
          closestDistance = distance
          closest = index
        }
      })

      return closest
    }

    const onWheel = (event: WheelEvent) => {
      if (sectionScrollLock.current || Math.abs(event.deltaY) < 20 || isInteractiveElement(event.target)) return

      const currentIndex = findNearestSectionIndex()
      const direction = event.deltaY > 0 ? 1 : -1
      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentIndex + direction))
      if (nextIndex === currentIndex) return

      const nextSection = document.getElementById(sectionIds[nextIndex])
      if (!nextSection) return

      event.preventDefault()
      sectionScrollLock.current = true
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => {
        sectionScrollLock.current = false
      }, 700)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className="bg-gradient-ink text-ivory">
      <ProgressRail ids={sectionIds} activeIndex={activeSection} />

      <section id="sensory" className="relative flex min-h-screen items-center px-6 py-24 md:px-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h1 className="font-serif text-5xl leading-tight text-ivory md:text-7xl">Every second, your brain is flooded.</h1>
            <p className="mt-6 max-w-xl text-lg text-ivory/80">Almost none of it survives.</p>
            <a href="#bottleneck" className="mt-10 inline-block rounded-full border border-white/30 px-5 py-2 text-sm">
              Scroll into the pipeline
            </a>
          </div>
          <ParticleStream />
        </div>
      </section>

      <SectionWrapper id="bottleneck" title="The Bottleneck">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <ParticleStream dense chaotic={trackEverything} />
          <div className="space-y-4">
            <p className="max-w-xl text-lg text-ivory/85">
              Attention is a filter, not a magnifying glass. To preserve signal, it must throw most input away.
            </p>
            <label className="inline-flex items-center gap-3 text-sm text-ivory/90">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={trackEverything}
                onChange={(event) => setTrackEverything(event.target.checked)}
              />
              Try to track everything
            </label>
            <BottleneckMeter chaotic={trackEverything} />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="inattention" title="Selective Attention">
        <InattentionGame />
        <p className="mt-4 max-w-3xl text-sm text-ivory/75">
          Simons and Chabris showed this in the invisible-gorilla task: when attention is occupied, obvious events can pass
          unseen.
        </p>
      </SectionWrapper>

      <SectionWrapper id="spotlight" title="The Attentional Filter">
        <AttentionSpotlight />
      </SectionWrapper>

      <SectionWrapper id="encoding" title="Encoding into Memory">
        <MemoryLattice />
      </SectionWrapper>

      <SectionWrapper id="test" title="The Memory Test">
        <MemoryTest />
      </SectionWrapper>

      <SectionWrapper id="synthesis" title="Synthesis & Reflection" className="pb-28">
        <SynthesisPanel />
      </SectionWrapper>
    </div>
  )
}

export default App

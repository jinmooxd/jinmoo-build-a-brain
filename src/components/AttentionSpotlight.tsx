import { useEffect, useMemo, useRef, useState } from 'react'
import { spotlightStimuli } from '../data/stimuli'
import { useAttendedItemsStore } from '../store/attendedItems'

type Position = { x: number; y: number }
const stableValue = (index: number, seed: number) => {
  const raw = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453
  return raw - Math.floor(raw)
}

export function AttentionSpotlight() {
  const fieldRef = useRef<HTMLDivElement | null>(null)
  const [cursor, setCursor] = useState<Position>({ x: 50, y: 50 })
  const [running, setRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(15)
  const [finished, setFinished] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)

  const recordExposure = useAttendedItemsStore((state) => state.recordExposure)
  const reset = useAttendedItemsStore((state) => state.reset)
  const markComplete = useAttendedItemsStore((state) => state.markComplete)

  const stimulusPositions = useMemo(
    () =>
      spotlightStimuli.map((_, index) => ({
        x: 10 + stableValue(index, 4) * 80,
        y: 10 + stableValue(index, 5) * 75,
      })),
    [],
  )

  useEffect(() => {
    if (!running || finished) return

    const frame = window.setInterval(() => {
      spotlightStimuli.forEach((item, index) => {
        const pos = stimulusPositions[index]
        const distance = Math.hypot(pos.x - cursor.x, pos.y - cursor.y)
        if (distance < 18) recordExposure(item.id, 0.1)
      })
    }, 100)

    return () => window.clearInterval(frame)
  }, [running, finished, cursor, recordExposure, stimulusPositions])

  useEffect(() => {
    if (!running || finished) return

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          setRunning(false)
          setFinished(true)
          markComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [running, finished, markComplete])

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!fieldRef.current || !running) return
    const bounds = fieldRef.current.getBoundingClientRect()
    setCursor({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const nudge = 4
    if (event.key === 'ArrowUp') setCursor((c) => ({ ...c, y: Math.max(0, c.y - nudge) }))
    if (event.key === 'ArrowDown') setCursor((c) => ({ ...c, y: Math.min(100, c.y + nudge) }))
    if (event.key === 'ArrowLeft') setCursor((c) => ({ ...c, x: Math.max(0, c.x - nudge) }))
    if (event.key === 'ArrowRight') setCursor((c) => ({ ...c, x: Math.min(100, c.x + nudge) }))
    if (event.key === 'Tab') {
      event.preventDefault()
      const next = (focusIndex + 1) % spotlightStimuli.length
      setFocusIndex(next)
      setCursor(stimulusPositions[next])
    }
  }

  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-lg text-ivory/85">
        Attention is the gate. What you focus on is what gets through.
      </p>
      <div
        ref={fieldRef}
        tabIndex={0}
        role="application"
        aria-label="Move spotlight with mouse or arrow keys"
        onMouseMove={onMove}
        onKeyDown={onKeyDown}
        className="relative h-[60vh] overflow-hidden rounded-3xl border border-white/10 bg-black/40 outline-none focus-visible:ring-2 focus-visible:ring-amber"
      >
        {spotlightStimuli.map((item, index) => {
          const pos = stimulusPositions[index]
          const distance = Math.hypot(pos.x - cursor.x, pos.y - cursor.y)
          const attended = distance < 18
          return (
            <div
              key={item.id}
              className={`absolute rounded-xl border px-3 py-2 text-sm transition ${
                attended
                  ? 'border-amber bg-amber/20 text-ivory shadow-glow'
                  : 'border-passive/40 bg-passive/10 text-passive blur-[0.2px]'
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <span className="mr-1">{item.emoji ?? '•'}</span>
              {item.label}
              {attended && <span className="ml-2 rounded bg-amber/30 px-2 py-0.5 text-xs">attended</span>}
            </div>
          )
        })}

        <div
          className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            background:
              'radial-gradient(circle, rgba(255,179,71,0.28) 0%, rgba(255,179,71,0.14) 35%, rgba(255,179,71,0) 72%)',
          }}
        />
      </div>

      {!running && !finished && (
        <button
          className="rounded-full border border-amber px-4 py-2 text-amber"
          onClick={() => {
            reset()
            setSecondsLeft(15)
            setFinished(false)
            setRunning(true)
          }}
        >
          Begin 15-second spotlight run
        </button>
      )}
      {running && <p className="text-sm text-ivory/70">Recording attended set... {secondsLeft}s</p>}
      {finished && <p className="text-sm text-amber">Attended items are now sent into memory encoding below.</p>}
    </div>
  )
}

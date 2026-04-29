import { useEffect, useMemo, useState } from 'react'

type Dot = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  color: 'blue' | 'yellow' | 'green'
  shape: 'circle' | 'square'
}

export function InattentionGame() {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [hits, setHits] = useState(0)
  const [answer, setAnswer] = useState('')
  const [noticed, setNoticed] = useState('')
  const [finished, setFinished] = useState(false)

  const [dots, setDots] = useState<Dot[]>(() =>
    Array.from({ length: 10 }).map((_, id) => ({
      id,
      x: Math.random() * 85,
      y: Math.random() * 80,
      dx: (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
      dy: (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
      color: ['blue', 'yellow', 'green'][id % 3] as Dot['color'],
      shape: id % 2 === 0 ? 'circle' : 'square',
    })),
  )

  useEffect(() => {
    if (!running || finished) return

    const step = window.setInterval(() => {
      setElapsed((prev) => {
        if (prev >= 20) {
          setRunning(false)
          setFinished(true)
          return prev
        }
        return prev + 0.05
      })
      setDots((prev) =>
        prev.map((dot) => {
          let x = dot.x + dot.dx
          let y = dot.y + dot.dy
          let dx = dot.dx
          let dy = dot.dy

          if (x <= 0 || x >= 95) {
            dx *= -1
            if (dot.color === 'blue' && dot.shape === 'circle' && x >= 95) {
              setHits((h) => h + 1)
            }
          }

          if (y <= 0 || y >= 90) dy *= -1
          x = Math.min(95, Math.max(0, x))
          y = Math.min(90, Math.max(0, y))

          return { ...dot, x, y, dx, dy }
        }),
      )
    }, 50)

    return () => window.clearInterval(step)
  }, [running, finished])

  const unusualVisible = elapsed > 10 && elapsed < 16
  const replayText = useMemo(
    () => 'A red triangle crossed the screen while your attention was occupied.',
    [],
  )

  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-lg text-ivory/85">
        Count how many <span className="font-semibold text-encoding">blue circles</span> bounce off the right wall.
      </p>
      <div className="relative h-80 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        {dots.map((dot) => (
          <span
            key={dot.id}
            className={`absolute h-5 w-5 ${
              dot.shape === 'circle' ? 'rounded-full' : 'rounded-sm'
            } ${
              dot.color === 'blue' ? 'bg-encoding' : dot.color === 'yellow' ? 'bg-amber' : 'bg-passive'
            }`}
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          />
        ))}
        {unusualVisible && <span className="absolute left-[35%] top-[45%] text-2xl">🔺</span>}
      </div>
      {!running && !finished && (
        <button className="rounded-full border border-amber px-4 py-2 text-amber" onClick={() => setRunning(true)}>
          Start 20-second trial
        </button>
      )}
      {running && <p className="text-sm text-ivory/70">Trial running... {Math.ceil(20 - elapsed)}s</p>}
      {finished && (
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-2">
          <label className="text-sm text-ivory/85">
            Your count
            <input
              className="mt-1 w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
          </label>
          <label className="text-sm text-ivory/85">
            Did you notice anything unusual?
            <input
              className="mt-1 w-full rounded border border-white/20 bg-transparent px-3 py-2"
              value={noticed}
              onChange={(event) => setNoticed(event.target.value)}
              placeholder="yes / no"
            />
          </label>
          <p className="text-sm text-ivory/70 md:col-span-2">
            Actual blue-circle right-wall bounces: {hits}. {replayText}
          </p>
        </div>
      )}
    </div>
  )
}

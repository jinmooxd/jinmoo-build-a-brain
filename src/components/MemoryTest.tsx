import { useMemo, useState } from 'react'
import { lureItems, spotlightStimuli } from '../data/stimuli'
import { useAttendedItemsStore } from '../store/attendedItems'

type TestItem = {
  label: string
  type: 'attended' | 'unattended' | 'lure'
}

export function MemoryTest() {
  const topAttended = useAttendedItemsStore((state) => state.topAttended)
  const attendedIds = topAttended(6)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const items = useMemo<TestItem[]>(() => {
    const attended = spotlightStimuli
      .filter((item) => attendedIds.includes(item.id))
      .slice(0, 6)
      .map((item) => ({ label: item.label, type: 'attended' as const }))

    const unattended = spotlightStimuli
      .filter((item) => !attendedIds.includes(item.id))
      .slice(0, 6)
      .map((item) => ({ label: item.label, type: 'unattended' as const }))

    const lures = lureItems.map((label) => ({ label, type: 'lure' as const }))

    const merged = [...attended, ...unattended, ...lures]
    return merged.sort((a, b) => a.label.localeCompare(b.label))
  }, [attendedIds])

  const toggle = (label: string) => {
    setSelected((prev) => (prev.includes(label) ? prev.filter((value) => value !== label) : [...prev, label]))
  }

  const stats = useMemo(() => {
    const attended = items.filter((item) => item.type === 'attended')
    const unattended = items.filter((item) => item.type === 'unattended')
    const lures = items.filter((item) => item.type === 'lure')

    const attendedRecall = attended.length
      ? Math.round((attended.filter((item) => selected.includes(item.label)).length / attended.length) * 100)
      : 0
    const unattendedFalse = unattended.length
      ? Math.round((unattended.filter((item) => selected.includes(item.label)).length / unattended.length) * 100)
      : 0
    const lureFalse = lures.length
      ? Math.round((lures.filter((item) => selected.includes(item.label)).length / lures.length) * 100)
      : 0

    return { attendedRecall, unattendedFalse, lureFalse, attendedCount: attended.length }
  }, [items, selected])

  return (
    <div className="space-y-4">
      <p className="max-w-2xl text-lg text-ivory/85">Select every item you remember seeing in the spotlight field.</p>
      <div className="grid gap-2 md:grid-cols-4">
        {items.map((item) => {
          const active = selected.includes(item.label)
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => toggle(item.label)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                active ? 'border-amber bg-amber/20 text-ivory' : 'border-white/20 bg-black/30 text-ivory/80'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <button className="rounded-full border border-amber px-4 py-2 text-amber" onClick={() => setSubmitted(true)}>
        Submit memory test
      </button>
      {submitted && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-ivory/85">
          <p>% attended recalled: {stats.attendedRecall}%</p>
          <p>% unattended falsely recalled: {stats.unattendedFalse}%</p>
          <p>% lures falsely recalled: {stats.lureFalse}%</p>
          <p className="mt-2 text-amber">
            You remembered {Math.round((stats.attendedRecall / 100) * stats.attendedCount)} of {stats.attendedCount} items
            you focused on. Attention chose your memory for you.
          </p>
        </div>
      )}
    </div>
  )
}

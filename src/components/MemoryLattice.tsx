import { spotlightStimuli } from '../data/stimuli'
import { useAttendedItemsStore } from '../store/attendedItems'

export function MemoryLattice() {
  const topAttended = useAttendedItemsStore((state) => state.topAttended)
  const attendedIds = topAttended(8)

  const attended = spotlightStimuli.filter((item) => attendedIds.includes(item.id))
  const unattended = spotlightStimuli.filter((item) => !attendedIds.includes(item.id)).slice(0, 8)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <h3 className="font-serif text-2xl text-ivory">Encoding lattice</h3>
        <p className="mt-2 text-sm text-ivory/70">
          Meaning and repetition reinforce pathways; unattended input dissolves at the gate.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {attended.length === 0 && <p className="text-sm text-passive">Run Section 4 to populate memory nodes.</p>}
          {attended.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-xl border border-encoding/40 bg-encoding/10 px-3 py-3 text-left text-sm text-ivory transition hover:bg-encoding/20"
            >
              <span className="block text-xs uppercase tracking-[0.1em] text-encoding">encoded</span>
              {item.emoji ?? '•'} {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <h3 className="font-serif text-2xl text-ivory">Lost at the entrance</h3>
        <p className="mt-2 text-sm text-ivory/70">Click a node that was not attended.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {unattended.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-xl border border-forgotten/40 bg-forgotten/20 px-3 py-3 text-left text-sm text-ivory/70"
              onClick={(event) => {
                const target = event.currentTarget
                target.textContent = 'Forgotten - could not be recovered'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

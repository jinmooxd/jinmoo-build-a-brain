import { references } from '../data/references'

export function SynthesisPanel() {
  return (
    <div className="space-y-5 rounded-3xl border border-white/10 bg-black/25 p-8">
      <p className="max-w-3xl text-lg leading-relaxed text-ivory/90">
        Attention and memory are not separate machines. They are one pipeline. Every moment, your senses collect far more
        than conscious awareness can hold. Attention selects a narrow stream, and that stream becomes the raw material
        memory can encode. What you rehearsed, tagged with meaning, or revisited gained stronger pathways. What stayed
        outside the gate faded before storage. You just watched this happen to your own recall.
      </p>
      <p className="text-xl text-amber">What did you choose to attend to today?</p>
      <div>
        <p className="text-sm uppercase tracking-[0.12em] text-passive">References</p>
        <ul className="mt-2 space-y-1 text-sm text-ivory/75">
          {references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-ivory/60">Jinmoo Yoo, PSYC 203, Rice University, 2026.</p>
    </div>
  )
}

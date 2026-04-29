type BottleneckMeterProps = {
  chaotic: boolean
}

export function BottleneckMeter({ chaotic }: BottleneckMeterProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-passive">Conscious bandwidth</p>
      <div className="mt-3 space-y-3 text-sm">
        <div>
          <p className="text-ivory/70">Input stream</p>
          <div className="h-2 rounded bg-passive/40">
            <div className="h-full w-full rounded bg-encoding" />
          </div>
          <p className="mt-1 text-ivory/70">~11,000,000 bits / sec</p>
        </div>
        <div>
          <p className="text-ivory/70">Conscious output</p>
          <div className="h-2 rounded bg-passive/40">
            <div className={`h-full rounded ${chaotic ? 'w-2 bg-forgotten animate-pulse' : 'w-8 bg-amber'}`} />
          </div>
          <p className="mt-1 text-ivory/70">~40 bits / sec</p>
        </div>
      </div>
    </div>
  )
}

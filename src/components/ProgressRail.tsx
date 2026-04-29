type ProgressRailProps = {
  ids: string[]
  activeIndex: number
}

export function ProgressRail({ ids, activeIndex }: ProgressRailProps) {
  return (
    <nav aria-label="Pipeline progress" className="fixed right-4 top-1/2 z-50 -translate-y-1/2">
      <ol className="flex flex-col gap-3 rounded-full border border-white/10 bg-ink/50 p-3 backdrop-blur">
        {ids.map((id, index) => {
          const active = index === activeIndex
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active ? 'step' : undefined}
                className={`block h-3 w-3 rounded-full border transition ${
                  active ? 'scale-125 border-amber bg-amber shadow-glow' : 'border-slate bg-passive'
                }`}
              >
                <span className="sr-only">Go to section {index + 1}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

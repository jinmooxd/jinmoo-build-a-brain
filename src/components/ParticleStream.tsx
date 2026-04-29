import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { streamStimuli } from '../data/stimuli'
import { useReducedMotion } from '../hooks/useReducedMotion'

type ParticleStreamProps = {
  dense?: boolean
  chaotic?: boolean
}

export function ParticleStream({ dense = false, chaotic = false }: ParticleStreamProps) {
  const reducedMotion = useReducedMotion()
  const stableValue = (index: number, seed: number) => {
    const raw = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453
    return raw - Math.floor(raw)
  }
  const particles = useMemo(
    () =>
      [...Array(dense ? 40 : 26)].map((_, i) => ({
        id: `${i}-${streamStimuli[i % streamStimuli.length]}`,
        text: streamStimuli[i % streamStimuli.length],
        top: stableValue(i, 1) * 85,
        duration: 9 + stableValue(i, 2) * 8,
        delay: stableValue(i, 3) * 3,
      })),
    [dense],
  )

  if (reducedMotion) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-ivory/80">
        Sensory data streams in constantly: car horns, cold air, blue signs, coffee smells, laughter.
      </div>
    )
  }

  return (
    <div className="relative h-[50vh] overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-ivory/80"
          style={{ top: `${particle.top}%` }}
          initial={{ x: '-20%' }}
          animate={{
            x: ['-20%', '110%'],
            rotate: chaotic ? [0, -6, 6, -3, 0] : 0,
            y: chaotic ? [0, 12, -14, 8, 0] : 0,
          }}
          transition={{
            duration: chaotic ? particle.duration / 2.2 : particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        >
          {particle.text}
        </motion.span>
      ))}
    </div>
  )
}

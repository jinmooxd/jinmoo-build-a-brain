import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type SectionWrapperProps = PropsWithChildren<{
  id: string
  title: string
  className?: string
}>

export function SectionWrapper({ id, title, className = '', children }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative flex min-h-screen items-center px-6 py-24 md:px-16 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-ivory md:text-5xl"
        >
          {title}
        </motion.h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  )
}

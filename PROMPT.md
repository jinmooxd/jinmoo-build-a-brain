# Build-A-Brain: Attention & Memory — Interactive Site

## Project Mission

Build a single-page interactive web experience that teaches visitors how **attention gates memory** — that what we remember is fundamentally determined by what we attended to. The governing metaphor is the brain as an **information-processing pipeline**: raw sensory input enters, attention filters and amplifies a subset, and only that subset gets encoded into memory. Visitors should *feel* this concept through firsthand interaction, not just read it.

This is a final project for an undergraduate psychology course (PSYC 203, "Build-a-Brain"). The audience is the professor and classmates — smart non-experts. Prioritize conceptual clarity and emotional resonance over technical flash.

## Tech Stack

- **Framework:** Vite + React 18 + TypeScript (strict)
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion as primary; CSS for simple transitions
- **State:** Zustand for the small cross-section store (which stimuli the user attended to)
- **Routing:** Single-page, scroll-driven — no router needed
- **3D (optional, only if it earns its weight):** React Three Fiber for the Section 5 memory lattice; otherwise SVG/Canvas
- **Deploy:** Static build, Vercel-ready

Modern React only (hooks, no classes). No `any` types unless wrapping an untyped lib.

## Site Architecture

One scrollable page, seven sections, each ~one viewport. A subtle vertical progress rail on the right shows position in the "pipeline." Use scroll-driven section transitions, not hard snapping.

### Section 1 — Hero: "Sensory Input"
- **Purpose:** Establish the metaphor; gently overwhelm the visitor.
- **Visual:** A wide stream of small particles — short text snippets ("car horn," "blue sign," "cold air," "coffee smell," "someone laughing") and abstract shapes — flowing rapidly across the screen.
- **Interaction:** Passive. Mouse movement subtly parallaxes the layers.
- **Copy:** Large heading like "Every second, your brain is flooded." Subtitle: "Almost none of it survives." Scroll cue at bottom.

### Section 2 — The Bottleneck
- **Purpose:** Show perception is bandwidth-limited.
- **Visual:** The Section-1 stream funnels into a narrow channel. A meter labeled "Conscious bandwidth" shows roughly 40 bits/sec leaving against ~11 million bits/sec entering.
- **Interaction:** A toggle "Try to track everything" — when on, particles jitter chaotically and the meter glitches. Point: it's not possible.
- **Copy:** Attention is a filter, not a magnifying glass — it has to throw things away.

### Section 3 — Selective Attention (Inattentional Blindness Demo)
- **Purpose:** Let the visitor *experience* attentional failure.
- **Interaction:** A counting task — "Count how many blue circles bounce off the right wall" — runs for ~20 seconds while many shapes move around. Mid-way, an unusual element appears clearly (a red triangle drifting across, or a label saying "DID YOU SEE ME?"). Afterward, ask for the count and "Did you notice anything unusual?" Then replay slowly with the unusual element highlighted.
- **Copy:** Brief tie-in to Simons & Chabris's invisible-gorilla study, in plain language.

### Section 4 — The Attentional Filter (Interactive Spotlight) — *the keystone section*
- **Purpose:** Let the visitor *be* the attention mechanism.
- **Visual:** A wide field of ~30 stimuli (words and small images) drifts slowly across the screen. The cursor is a soft glowing spotlight. Items inside the spotlight gain warm amber color, sharpness, and a subtle label tag; items outside fade to muted blue, blur, and lose detail.
- **Interaction:** Move the cursor for ~15 seconds. The store records which items spent the most cumulative time inside the spotlight (the "attended set"). At the end, the attended items pulse and travel toward Section 5; the rest fragment and dissolve.
- **Keyboard mode:** Arrow keys move the spotlight; Tab cycles through stimuli for screen-reader users.
- **Copy:** "Attention is the gate. What you focus on is what gets through."

### Section 5 — Encoding into Memory
- **Purpose:** Visualize attended-perception → stored-memory.
- **Visual:** The attended set from Section 4 travels along a pipeline into a lattice (3D-feeling but can be rendered as animated SVG/Canvas) representing memory. Each item lights a node and forms connections to nearby nodes; unattended items dissolve into static at the entrance.
- **Interaction:** Hover an encoded node to see a detail card with the actual stimulus the user attended to. Click a "lost" node to see a "forgotten — couldn't be recovered" state.
- **Copy:** A brief note on how meaning and repetition strengthen encoding (long-term potentiation, plain language).

### Section 6 — The Memory Test
- **Purpose:** Prove the thesis using the visitor's own performance.
- **Visual:** A clean grid of 16 items: 6 the user actually attended to in Section 4, 6 distractors that were on screen but never spotlighted, 4 lures that were never present at all.
- **Interaction:** Multi-select what they remember seeing, then submit. Results show three numbers: % attended recalled, % unattended falsely recalled, % lures falsely recalled. The first will be high; the second and third low — *that gap is the lesson*.
- **Copy:** Personalized result: "You remembered X of Y items you focused on. Only Z items you didn't focus on made it through. Attention chose your memory for you."

### Section 7 — Synthesis & Reflection
- **Purpose:** Land the takeaway; credit sources.
- **Visual:** Calm, full-width text on a dark background. A small animated diagram recapping the pipeline.
- **Copy:** 100–150 words tying attention and memory together as one system, not two. End with a question that lingers: "What did you choose to attend to today?"
- **Footer:** "Jinmoo Yoo, PSYC 203, Rice University, 2026." References (Simons & Chabris 2010; Cowan 2001; Baddeley's working memory model). Small "About this build" modal explaining the metaphor for anyone curious.

## Visual Design System

### Palette
- Background: gradients between `#0A0E1A` (deep ink) and `#141929` (slate)
- Attended / active: `#FFB347` (warm amber) with a soft outer glow
- Unattended / passive: `#5A6B8C` (muted blue)
- Lost / forgotten: `#3A2A35` (faded mauve), heavily desaturated
- Headings / highlights: `#F5F0E8` (warm off-white)
- Memory-encoded glow: `#9DCEFF` (cool blue-white)

### Typography
- Headings: a serif with character (e.g., Fraunces or Newsreader from Google Fonts) — large weights for section titles
- Body: a clean sans (e.g., Inter or Geist)
- Fluid sizing with `clamp()` so it reads well on mobile and desktop

### Layout
- Generous whitespace; max prose width ~720px; visualizations go full-bleed
- Each section vertically centered with breathing room
- Right-edge progress rail (7 dots), each clickable to jump

### Motion
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)` — soft, confident, never bouncy
- Particles: Framer Motion with randomized loops; respect `prefers-reduced-motion` with a static labeled fallback
- Section-entry: subtle fade-up of headings (~16px translateY, ~600ms)
- Spotlight (Section 4): radial-gradient mask centered on cursor; CSS filters (`blur`, `saturate`) on the un-attended layer
- This experience is meditative, not playful — keep motion restrained

## Suggested File Structure

```
src/
  components/
    ProgressRail.tsx
    SectionWrapper.tsx
    ParticleStream.tsx
    BottleneckMeter.tsx
    InattentionGame.tsx
    AttentionSpotlight.tsx     // writes to store
    MemoryLattice.tsx          // reads from store
    MemoryTest.tsx             // reads from store
    SynthesisPanel.tsx
  hooks/
    useScrollSection.ts
    useReducedMotion.ts
  store/
    attendedItems.ts           // Zustand: which items the user actually attended
  data/
    stimuli.ts                 // canonical pool of words/images used across demos
    references.ts
  App.tsx
  main.tsx
  index.css
```

The shared store is the heart of the experience — Sections 4, 5, and 6 must use the *same* per-visitor data so the memory test feels personally damning, not generic.

## Accessibility & Performance

- Keyboard navigation throughout (including spotlight mode in Section 4)
- `prefers-reduced-motion` honored everywhere — particle systems get a static diagram fallback
- Color never the only cue — attended items also gain size, sharpness, and a text label
- WCAG AA contrast on body text; visible focus rings
- Single `<h1>` in hero; semantic `<h2>` per section
- Lighthouse Performance ≥ 90 on mobile
- CLS < 0.1, no layout shift on section entry
- Initial JS bundle under 250KB gzipped (lazy-load Section 5's heavier visual)
- Animation loops use `requestAnimationFrame` or Framer Motion — never `setInterval`

## Voice & Copy

Confident, curious, slightly literary. Short sentences for impact; longer ones for explanation. Cite real research where it earns its place (Simons & Chabris on inattentional blindness; Baddeley's working memory model; Cowan's 4±1) but explain in plain language. Never lecture — show, then name what was shown.

## Build Order

1. Scaffold with `npm create vite@latest brain -- --template react-ts`. Install Tailwind, Framer Motion, Zustand.
2. Configure design tokens in `tailwind.config.ts` (colors, fonts, easing).
3. Build `SectionWrapper` + `ProgressRail` and stub seven empty sections — get the scroll skeleton right first.
4. Build sections in order 1 → 7, each independently testable.
5. After Section 4 works, wire the Zustand store so Sections 5 and 6 read the user's real attended set.
6. Polish: motion timing, copy, accessibility audit, Lighthouse.
7. Deploy a Vercel preview.

## Definition of Done

A visitor who has never heard of selective attention can scroll this site in 6–8 minutes and walk away able to articulate that **memory is downstream of attention**. They felt a stimulus slip past them. They watched their own recall fail on items they didn't focus on. The pipeline metaphor is now intuitive.

Build for that visitor.
/**
 * Decorative line-art landscapes (karst peaks drawn as nested contour arches, a sun, stepped clouds,
 * water lines or waves), in the spirit of Vietnamese / East-Asian line illustration. Drawn in
 * `currentColor`, so colour comes from a text-* class; `fill` should match the section background so
 * front peaks hide the lines of the peaks behind them. Purely decorative (aria-hidden).
 */

type Pt = [number, number]
/** Peak silhouettes: u = 0..1 across the base, v = 0..1 up to the top. */
const SHAPES: Pt[][] = [
  [[0, 0], [0.12, 0.45], [0.28, 0.62], [0.4, 0.9], [0.55, 1], [0.7, 0.8], [0.85, 0.5], [1, 0]],
  [[0, 0], [0.18, 0.6], [0.35, 0.85], [0.5, 1], [0.62, 0.9], [0.8, 0.55], [1, 0]],
  [[0, 0], [0.1, 0.7], [0.25, 0.95], [0.45, 1], [0.6, 0.92], [0.78, 0.7], [0.9, 0.35], [1, 0]],
]

/** [left x, base y, width, height, shape] — listed back to front. */
type Peak = [number, number, number, number, number]

interface Scene {
  peaks: Peak[]
  water: 'lines' | 'waves' | 'river'
  base: number
  sun?: [number, number, number]
  clouds?: [number, number, number][]
}

const SCENES = {
  // Bay: islands rising from still water (Ha Long / Lan Ha).
  bay: {
    base: 120,
    peaks: [[150, 120, 80, 62, 0], [60, 120, 110, 92, 1], [210, 120, 130, 100, 2], [320, 120, 70, 48, 0]],
    water: 'lines',
    sun: [190, 34, 11],
    clouds: [[20, 40, 60], [300, 26, 70]],
  },
  // Peaks: a tall karst cluster above rolling waves (Ninh Binh).
  peaks: {
    base: 122,
    peaks: [[40, 122, 70, 70, 1], [250, 122, 80, 84, 1], [90, 122, 90, 108, 2], [170, 122, 95, 96, 1], [300, 122, 70, 60, 0]],
    water: 'waves',
    sun: [345, 30, 10],
  },
  // River: hills ringed by a winding river (Ha Giang / Cao Bang).
  river: {
    base: 112,
    peaks: [[120, 112, 90, 70, 0], [190, 112, 110, 92, 2], [60, 112, 80, 58, 1], [280, 112, 80, 64, 0]],
    water: 'river',
    sun: [330, 30, 12],
    clouds: [[30, 34, 70]],
  },
} satisfies Record<string, Scene>

export type MotifVariant = keyof typeof SCENES

const f = (n: number) => Math.round(n * 10) / 10

function peakPaths([x, base, w, h, s]: Peak) {
  const shape = SHAPES[s]
  const apex = shape.reduce((a, p) => (p[1] > a[1] ? p : a))
  const ring = (k: number) =>
    shape.map(([u, v], i) => `${i ? 'L' : 'M'}${f(x + (apex[0] + (u - apex[0]) * k) * w)} ${f(base - v * k * h)}`).join(' ')
  return { outline: ring(1) + ' Z', rings: [0.78, 0.56, 0.34].map(ring) }
}

function water(kind: Scene['water'], base: number) {
  if (kind === 'lines') {
    // Staggered dashes, shorter towards the bottom.
    const rows: [number, number, number][] = [[10, 400, 0], [30, 250, 7], [300, 380, 7], [60, 200, 14], [230, 340, 14], [110, 280, 21]]
    return rows.map(([a, b, dy]) => `M${a} ${base + dy}H${b}`)
  }
  if (kind === 'waves') {
    return [0, 7, 14].map((dy, i) => {
      let d = `M${i * 12} ${base + dy}`
      for (let x = i * 12; x < 400; x += 48) d += ` q12 -7 24 0 t24 0`
      return d
    })
  }
  // A river sweeping round the front of the hills and back up behind them.
  return [0, 8, 16].map((dy) => `M8 ${base + 4 + dy} C90 ${base + 34 + dy} 250 ${base - 6 + dy} 330 ${base + 10 + dy} S410 ${base - 34 + dy / 2} 360 ${base - 46 + dy / 2}`)
}

export default function LineMotif({ variant, fill = 'transparent', className = '' }: { variant: MotifVariant; fill?: string; className?: string }) {
  const sc: Scene = SCENES[variant]
  return (
    <svg viewBox="0 0 400 160" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`pointer-events-none ${className}`}>
      {sc.clouds?.map(([x, y, w]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y}h${w}v-6h${f(w * 0.35)}M${x + 14} ${y + 8}h${f(w * 0.6)}`} />
      ))}
      {sc.sun && <circle cx={sc.sun[0]} cy={sc.sun[1]} r={sc.sun[2]} />}
      {water(sc.water, sc.base).map((d) => (
        <path key={d} d={d} />
      ))}
      {sc.peaks.map((p) => {
        const { outline, rings } = peakPaths(p)
        return (
          <g key={p.join()}>
            <path d={outline} fill={fill} />
            {rings.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

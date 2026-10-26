import { useEffect, useRef, useState } from 'react'
import type { HeroBanner } from '@/data/home'
import { useI18n } from '@/i18n'
import Img from '../ui/Img'

type Conn = Navigator & { connection?: { saveData?: boolean } }

/**
 * Hero background: the poster image paints first (LCP). A muted video is only
 * loaded and played while the hero is in view, pauses when scrolled away, and
 * loops for as long as the brand slide is showing.
 *
 * Destination photos: once `warm` is set (the visitor reached for or picked
 * the cards) all of `images` are mounted so they download ahead of time. When the
 * parent passes `image`, that photo cross-fades in, but only after it has fully
 * loaded, so a switch never flashes an empty or half-decoded frame; the shown
 * photo slowly zooms out (Ken Burns). Mobile gets the lighter 540p video. No video
 * is loaded for visitors who prefer reduced motion or have data saving on.
 */
export default function HeroMedia({
  banner,
  images,
  image,
  warm,
  onShown,
}: {
  banner: HeroBanner
  images: string[]
  image: string | null
  warm: boolean
  /** Called with a photo's path once it has fully faded in. */
  onShown?: (src: string) => void
}) {
  const { l } = useI18n()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [inView, setInView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(new Set())
  // The photo actually on screen: follows `image` as soon as that file has loaded.
  const [shown, setShown] = useState<string | null>(null)
  // The photo being replaced stays opaque (and keeps its zoom) underneath while the new one fades in on top.
  const [prev, setPrev] = useState<string | null>(null)
  const stopped = image != null

  useEffect(() => {
    if (image && image !== shown && loaded.has(image)) {
      setPrev(shown)
      setShown(image)
    }
  }, [image, loaded, shown])

  const onShownRef = useRef(onShown)
  onShownRef.current = onShown
  useEffect(() => {
    if (!shown) return
    const id = window.setTimeout(() => onShownRef.current?.(shown), 1200)
    return () => window.clearTimeout(id)
  }, [shown])

  useEffect(() => {
    if (!banner.video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || (navigator as Conn).connection?.saveData) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [banner.video])

  // Load the file the first time the hero comes into view (unless a destination was already picked).
  useEffect(() => {
    if (inView && !src && !stopped && banner.video) {
      setSrc(window.matchMedia('(min-width: 768px)').matches ? banner.video.desktop : banner.video.mobile)
    }
  }, [inView, src, stopped, banner.video])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView && !stopped) v.play().catch(() => {})
    else v.pause()
  }, [inView, src, stopped])

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10 overflow-hidden">
      <Img src={banner.image} alt={l(banner.imageAlt)} priority aria-hidden={shown != null} className="absolute inset-0 size-full object-cover object-center" />
      {src && (
        <video
          ref={videoRef}
          src={src}
          poster={banner.video?.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out ${playing && !shown ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(warm || image != null) &&
        images.map((s) => (
          <img
            key={s}
            src={s}
            alt=""
            aria-hidden
            decoding="async"
            onLoad={() => setLoaded((prev) => new Set(prev).add(s))}
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out will-change-[opacity,transform] ${
              s === shown ? 'z-[2] animate-kenburns opacity-100' : s === prev ? 'z-[1] animate-kenburns opacity-100' : 'opacity-0'
            }`}
          />
        ))}
    </div>
  )
}

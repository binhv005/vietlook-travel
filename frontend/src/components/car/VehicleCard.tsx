import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CarFront } from 'lucide-react'
import type { Vehicle } from '@/data/types'
import { fmt, useI18n } from '@/i18n'
import Img from '../ui/Img'

const vnd = (n: number) => `VND ${n.toLocaleString('en-US')}`

/** Vehicle card: studio photo on a warm panel, type, typical models, "from" price per trip and a quote link. */
export default function VehicleCard({ vehicle: v }: { vehicle: Vehicle }) {
  const { t, l, to } = useI18n()
  const href = `${to('/private-car/quote')}?vehicle=${v.slug}`
  // Hovering a gallery thumbnail previews it in the main frame; leaving the card restores the studio shot.
  const [preview, setPreview] = useState<string | null>(null)
  const thumbs = v.image ? [v.image, ...v.gallery] : v.gallery
  return (
    <Link
      to={href}
      onMouseLeave={() => setPreview(null)}
      className="group flex h-full flex-col rounded-3xl border border-[#efe7da] bg-[#f7f3ec] p-5 shadow-[0_10px_30px_-18px_rgba(80,60,20,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(80,60,20,0.45)]"
    >
      <div className="flex aspect-[16/7] items-center justify-center overflow-hidden rounded-2xl">
        {preview && preview !== v.image ? (
          <Img src={preview} alt={l(v.name)} className="size-full rounded-2xl object-cover" />
        ) : v.image ? (
          // multiply blends the white studio background into the card colour
          <Img src={v.image} alt={l(v.name)} className="size-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex flex-col items-center text-[#c9b79a]">
            <CarFront className="size-14" aria-hidden />
            <span className="mt-1 text-xs font-semibold">{t.car.photoSoon}</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col px-1">
        <h3 className="text-xl font-bold text-ink">{l(v.name)}</h3>
        <p className="mt-1.5 truncate text-[0.95rem] text-muted" title={v.models}>
          {v.models ?? fmt(t.car.seats, { n: v.seats })}
        </p>
        {thumbs.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-1.5" aria-label={t.tour.gallery}>
            {thumbs.slice(0, 5).map((src) => (
              <li key={src} onMouseEnter={() => setPreview(src)}>
                <Img
                  src={src}
                  alt=""
                  className={`aspect-[4/3] w-full rounded-lg bg-white object-cover ring-2 transition ${
                    (preview ?? v.image) === src ? 'ring-[#c9a24a]' : 'ring-transparent hover:ring-[#e6d3a8]'
                  }`}
                />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div className="min-w-0">
            {v.priceFromVnd != null ? (
              <p className="text-sm whitespace-nowrap text-muted">
                {t.car.priceFrom} <strong className="text-lg font-extrabold text-[#8a5a00]">{vnd(v.priceFromVnd)}</strong> {t.car.perTrip}
              </p>
            ) : (
              <p className="text-[0.95rem] font-semibold text-muted">{t.common.priceOnRequest}</p>
            )}
          </div>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fbeccc] text-[#8a5a00] transition group-hover:bg-[#8a5a00] group-hover:text-white" aria-hidden>
            <ArrowRight className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

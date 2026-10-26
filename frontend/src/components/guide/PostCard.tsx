import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import type { Post } from '@/data/types'
import { getCategory } from '@/data/posts'
import { useI18n } from '@/i18n'
import Img from '../ui/Img'
import { site } from '@/data/site'

/** Badge colour per top-level guide topic (sub-categories inherit their parent's colour). */
const BADGE: Record<string, string> = {
  destinations: 'bg-brand-600',
  'essential-guide': 'bg-amber-500',
  'vietnam-by-month': 'bg-emerald-600',
  transportation: 'bg-violet-600',
  'culture-food': 'bg-accent-500',
}
function badgeColor(slug: string) {
  const c = getCategory(slug)
  return BADGE[c?.parent ?? slug] ?? 'bg-brand-600'
}

export function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Blog card in three layouts: grid card, large feature, compact row. */
export default function PostCard({ post, variant = 'card' }: { post: Post; variant?: 'card' | 'large' | 'row' }) {
  const { t, l, to, lang } = useI18n()
  const href = to(`/travel-guide/${post.slug}`)
  const cat = getCategory(post.category)
  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-muted">
      {cat && (
        <Link to={to(`/travel-guide/${cat.slug}`)} className="tracking-wide text-accent-500 uppercase hover:underline">
          {l(cat.name)}
        </Link>
      )}
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="size-3.5" aria-hidden />
        <time dateTime={post.updated ?? post.published}>{formatDate(post.updated ?? post.published, lang)}</time>
      </span>
    </p>
  )

  // Coloured category pill and "By … · date" byline used by the row and large (magazine) layouts.
  const badge = cat && (
    <Link to={to(`/travel-guide/${cat.slug}`)} className={`relative z-10 inline-block rounded px-2 py-1 text-[0.68rem] leading-none font-bold tracking-wide text-white uppercase hover:brightness-110 ${badgeColor(cat.slug)}`}>
      {l(cat.name)}
    </Link>
  )
  const byline = (light: boolean) => (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${light ? 'text-white/85' : 'text-muted'}`}>
      <span className="inline-flex items-center gap-1.5">
        <img src={site.logo} alt="" className="size-6 rounded-full bg-white object-contain p-0.5" />
        {t.common.by} <span className={`font-semibold ${light ? 'text-white' : 'text-ink'}`}>Vietlook</span>
      </span>
      <span aria-hidden>•</span>
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="size-3.5" aria-hidden />
        <time dateTime={post.updated ?? post.published}>{formatDate(post.updated ?? post.published, lang)}</time>
      </span>
    </p>
  )

  if (variant === 'row') {
    return (
      <article className="group flex items-center gap-4">
        <Link to={href} tabIndex={-1} aria-hidden className="block aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl sm:w-44">
          <Img src={post.cover} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <div className="min-w-0">
          {badge}
          <h3 className="mt-2 line-clamp-3 text-[1.05rem] leading-snug font-bold">
            <Link to={href} className="hover:text-brand-700">
              {l(post.title)}
            </Link>
          </h3>
          <div className="mt-2">{byline(false)}</div>
        </div>
      </article>
    )
  }

  if (variant === 'large') {
    return (
      <article className="group relative h-full min-h-[440px] overflow-hidden rounded-2xl">
        <Img src={post.cover} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          {badge}
          <h3 className="mt-3 text-2xl leading-tight font-extrabold text-white md:text-[2.4rem]">
            <Link to={href} className="after:absolute after:inset-0">
              {l(post.title)}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-2 max-w-xl text-white/85">{l(post.excerpt)}</p>
          <div className="mt-4">{byline(true)}</div>
        </div>
      </article>
    )
  }

  return (
    <article className="card group flex h-full flex-col">
      <Link to={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <Img src={post.cover} alt="" className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {meta}
        <h3 className="mt-2 text-lg leading-snug font-bold">
          <Link to={href} className="hover:text-brand-700">
            {l(post.title)}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{l(post.excerpt)}</p>
      </div>
    </article>
  )
}

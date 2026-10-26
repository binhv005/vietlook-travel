import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FolderTree, Search, X } from 'lucide-react'
import type { BlogCategory } from '@/data/types'
import { blogCategories, categoryFamily, posts } from '@/data/posts'
import { regions } from '@/data/destinations'
import { fmt, useI18n } from '@/i18n'
import Seo from '../ui/Seo'
import Img from '../ui/Img'
import Pagination from '../ui/Pagination'
import PageIntro from '../sections/PageIntro'
import CtaBanner from '../sections/CtaBanner'
import PostCard from './PostCard'

const PAGE_SIZE = 6

function CategoryTree({ active }: { active?: string }) {
  const { t, l, to } = useI18n()
  const roots = blogCategories.filter((c) => !c.parent)
  const count = (slug: string) => posts.filter((p) => categoryFamily(slug).includes(p.category)).length
  const item = (c: BlogCategory, child = false) => (
    <Link
      to={to(`/travel-guide/${c.slug}`)}
      aria-current={active === c.slug ? 'page' : undefined}
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-[0.93rem] transition ${child ? 'pl-7' : 'font-semibold'} ${
        active === c.slug ? 'bg-brand-600 text-white' : 'hover:bg-brand-50 hover:text-brand-700'
      }`}
    >
      {l(c.name)}
      <span className={`text-xs ${active === c.slug ? 'text-white/80' : 'text-muted'}`}>{count(c.slug)}</span>
    </Link>
  )
  return (
    <nav aria-label={t.guide.categories} className="rounded-xl border border-line bg-white p-4">
      <h2 className="mb-3 flex items-center gap-2 px-3 text-sm font-bold tracking-wide uppercase">
        <FolderTree className="size-4" aria-hidden /> {t.guide.categories}
      </h2>
      <ul className="space-y-0.5">
        <li>
          <Link to={to('/travel-guide')} aria-current={!active ? 'page' : undefined} className={`block rounded-lg px-3 py-2 text-[0.93rem] font-semibold ${!active ? 'bg-brand-600 text-white' : 'hover:bg-brand-50'}`}>
            {t.guide.all}
          </Link>
        </li>
        {roots.map((c) => (
          <li key={c.slug}>
            {item(c)}
            {blogCategories.some((x) => x.parent === c.slug) && (
              <ul className="space-y-0.5">
                {blogCategories
                  .filter((x) => x.parent === c.slug)
                  .map((x) => (
                    <li key={x.slug}>{item(x, true)}</li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Travel guide index and category pages (Local Vietnam guide structure). */
export default function GuideListing({ category }: { category?: BlogCategory }) {
  const { t, l, to, lang } = useI18n()
  const [sp, setSp] = useSearchParams()
  const page = Math.max(1, Number(sp.get('page')) || 1)
  const query = (sp.get('q') ?? '').trim().toLowerCase()
  const [searchOpen, setSearchOpen] = useState(!!query)
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus()
  }, [searchOpen])

  const list = useMemo(() => {
    const family = category ? categoryFamily(category.slug) : null
    return posts
      .filter((p) => !family || family.includes(p.category))
      .filter((p) => !query || [p.title.en, p.title.zh, p.excerpt[lang]].some((s) => s.toLowerCase().includes(query)))
      .sort((a, b) => (b.updated ?? b.published).localeCompare(a.updated ?? a.published))
  }, [category, query, lang])

  const showFeatured = !category && !query && page === 1
  const featured = showFeatured ? posts.filter((p) => p.featured).slice(0, 3) : []
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE))
  const visible = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const parent = category?.parent ? blogCategories.find((c) => c.slug === category.parent) : undefined
  const topics = blogCategories.filter((c) => !c.parent && c.slug !== 'destinations')

  const title = category ? l(category.name) : t.guide.title
  const crumbs = category
    ? [{ label: t.nav.guide, to: '/travel-guide' }, ...(parent ? [{ label: l(parent.name), to: `/travel-guide/${parent.slug}` }] : []), { label: title }]
    : [{ label: t.nav.guide }]

  const setParam = (next: Record<string, string | null>, replace = false) => {
    const n = new URLSearchParams(sp)
    Object.entries(next).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)))
    setSp(n, { preventScrollReset: true, replace })
  }
  const closeSearch = () => {
    setParam({ q: null, page: null })
    setSearchOpen(false)
  }

  return (
    <>
      <Seo title={category ? `${title} – ${t.guide.title}` : title} description={category ? l(category.description) : t.guide.intro} path={category ? `/travel-guide/${category.slug}` : '/travel-guide'} />
      <PageIntro crumbs={crumbs} title={title} intro={category ? l(category.description) : t.guide.intro} image="/images/tours/hoi-an-9-copy.webp" />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          {featured.length > 0 && (
            <section aria-labelledby="g-featured" className="mb-14">
              <h2 id="g-featured" className="mb-6 text-sm font-bold tracking-[0.14em] text-accent-500 uppercase">
                {t.guide.featured}
              </h2>
              <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
                <PostCard post={featured[0]} variant="large" />
                <div className="space-y-5">
                  {featured.slice(1).map((p) => (
                    <PostCard key={p.slug} post={p} variant="row" />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section aria-labelledby="g-latest">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 id="g-latest" className="text-2xl font-bold">
                {category ? title : t.guide.latest}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted">{fmt(t.guide.articles, { n: list.length })}</span>
                {searchOpen ? (
                  <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
                    <label htmlFor="g-search" className="sr-only">
                      {t.guide.search}
                    </label>
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
                    <input
                      id="g-search"
                      ref={searchInput}
                      type="search"
                      value={sp.get('q') ?? ''}
                      onChange={(e) => setParam({ q: e.target.value || null, page: null }, true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') closeSearch()
                      }}
                      placeholder={t.guide.search}
                      className="field-input w-56 py-2 pr-9 pl-9 text-sm sm:w-64 [&::-webkit-search-cancel-button]:hidden"
                    />
                    <button
                      type="button"
                      onClick={closeSearch}
                      aria-label={t.common.close}
                      className="absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink"
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label={t.guide.search}
                    title={t.guide.search}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  >
                    <Search className="size-[18px]" aria-hidden />
                  </button>
                )}
              </div>
            </div>
            {visible.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-line bg-mist p-10 text-center text-muted">{t.guide.empty}</p>
            )}
            <Pagination page={Math.min(page, pages)} pages={pages} onChange={(p) => setParam({ page: p > 1 ? String(p) : null })} />
          </section>

          {!category && (
            <>
              <section aria-labelledby="g-dest" className="mt-16">
                <h2 id="g-dest" className="mb-6 text-2xl font-bold">
                  {t.guide.byDestination}
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {regions.map((r) => (
                    <Link key={r.slug} to={to(`/travel-guide/${r.slug}`)} className="group relative block aspect-[4/3] overflow-hidden rounded-xl">
                      <Img src={r.image} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" aria-hidden />
                      <span className="absolute bottom-4 left-4 font-bold text-white">{l(r.name)}</span>
                    </Link>
                  ))}
                </div>
              </section>
              <section aria-labelledby="g-topic" className="mt-14">
                <h2 id="g-topic" className="mb-6 text-2xl font-bold">
                  {t.guide.byTopic}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {topics.map((c) => (
                    <Link key={c.slug} to={to(`/travel-guide/${c.slug}`)} className="rounded-xl border border-line p-5 transition hover:border-brand-300 hover:shadow-sm">
                      <h3 className="font-bold">{l(c.name)}</h3>
                      <p className="mt-1 text-sm text-muted">{l(c.description)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <CategoryTree active={category?.slug} />
        </aside>
      </div>
      <CtaBanner title={t.guide.ctaTitle} text={t.guide.ctaText} />
    </>
  )
}

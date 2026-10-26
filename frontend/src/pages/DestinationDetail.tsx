import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, CloudSun, Lightbulb, Plane, Utensils } from 'lucide-react'
import { destinationGuides } from '@/data/destination-guides'
import Accordion from '@/components/ui/Accordion'
import { citiesOf, getDestination } from '@/data/destinations'
import { toursByDestination } from '@/data/tours'
import { postsByDestination } from '@/data/posts'
import { fmt, useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import TourCard from '@/components/tour/TourCard'
import PostCard from '@/components/guide/PostCard'
import CtaBanner from '@/components/sections/CtaBanner'
import MapBackdrop from '@/components/ui/MapBackdrop'
import NotFound from './NotFound'

export default function DestinationDetail() {
  const { slug = '' } = useParams()
  const d = getDestination(slug)
  const { t, l, ll, to } = useI18n()
  const [faqOpen, setFaqOpen] = useState<Set<string>>(() => new Set(['faq-0']))
  if (!d) return <NotFound />

  const parent = d.region ? getDestination(d.region) : undefined
  const children = d.kind === 'region' ? citiesOf(d.slug) : []
  const relTours = toursByDestination(d.slug).sort((a, b) => a.order - b.order)
  const relPosts = postsByDestination(d.slug).slice(0, 3)
  const name = l(d.name)
  const guide = destinationGuides[d.slug]
  // Photo pool for the "things to do" cards: highlights first, then the page's other images, without repeats.
  const photos = [...new Set([...d.highlights.map((h) => h.image), d.image, d.hero])]
  const q = t.destinations.faqQ
  // FAQ built from this page's own facts, plus the standard private-tour question.
  const faqs = [
    ...(guide ? [{ q: fmt(q.stay, { name }), a: l(guide.stay) }, { q: fmt(q.get, { name }), a: l(guide.gettingThere) }] : []),
    ...(d.bestTime ? [{ q: fmt(q.when, { name }), a: l(d.bestTime) }] : []),
    { q: fmt(q.private, { name }), a: q.privateA },
  ]
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
  }
  const crumbs = [{ label: t.nav.destinations, to: '/destinations' }, ...(parent ? [{ label: l(parent.name), to: `/destinations/${parent.slug}` }] : []), { label: name }]

  return (
    <>
      <Seo title={l(d.seo.title)} description={l(d.seo.description)} path={`/destinations/${d.slug}`} image={d.hero} jsonLd={faqLd} />
      <PageHero image={d.hero} imageAlt={name} eyebrow={parent ? l(parent.name) : t.nav.destinations} title={name} text={l(d.tagline)} crumbs={crumbs} size="lg" />

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-3">{t.destinations.overviewEyebrow}</p>
            <h2 className="h-section mb-5">{fmt(t.destinations.overviewTitle, { name })}</h2>
            <div className="prose-body">
              {ll(d.intro).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {/* Second photo fills the space beside the (taller) facts panel. */}
            <Img src={d.image} alt={name} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
          </div>
          {(d.bestTime || guide) && (
            <aside className="h-fit space-y-5 rounded-2xl bg-mist p-6">
              {guide && (
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <CalendarDays className="size-5 text-brand-600" aria-hidden /> {t.destinations.stay}
                  </h2>
                  <p className="mt-2 leading-relaxed">{l(guide.stay)}</p>
                </div>
              )}
              {d.bestTime && (
                <div className={guide ? 'border-t border-line pt-5' : ''}>
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <CloudSun className="size-5 text-sun" aria-hidden /> {t.destinations.when}
                  </h2>
                  <p className="mt-2 leading-relaxed">{l(d.bestTime)}</p>
                  <p className="mt-2 text-xs text-muted">{t.destinations.whenNote}</p>
                </div>
              )}
              {guide && (
                <div className="border-t border-line pt-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold">
                    <Plane className="size-5 text-brand-600" aria-hidden /> {t.destinations.gettingThere}
                  </h2>
                  <p className="mt-2 leading-relaxed">{l(guide.gettingThere)}</p>
                </div>
              )}
            </aside>
          )}
        </div>
      </section>

      {children.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="container-x">
            <SectionHeading title={fmt(t.destinations.places, { name })} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 max-md:[&>*:last-child:nth-child(odd)]:col-span-2 max-md:[&>*:last-child:nth-child(odd)]:aspect-[16/9]">
              {children.map((c) => (
                <Link key={c.slug} to={to(`/destinations/${c.slug}`)} className="group relative block aspect-[4/5] overflow-hidden rounded-xl">
                  <Img src={c.image} alt="" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-bold text-white">{l(c.name)}</h3>
                    <p className="line-clamp-2 text-xs text-white/75">{l(c.tagline)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-sand py-16 md:py-20">
        <div className="container-x">
          <SectionHeading title={fmt(t.destinations.highlights, { name })} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.highlights.map((h, i) => (
              <Reveal key={h.name.en} delay={i * 70}>
                <figure className="card flex h-full flex-col">
                  <Img src={h.image} alt={l(h.name)} className="aspect-[3/2] w-full object-cover" />
                  <figcaption className="p-5">
                    <h3 className="text-lg font-bold">{l(h.name)}</h3>
                    <p className="mt-1 text-sm text-muted">{l(h.text)}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {guide && (
        <section className="py-16 md:py-20">
          <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading title={fmt(t.destinations.todo, { name })} />
              <ul className="grid gap-3 sm:grid-cols-2">
                {ll(guide.experiences).map((x, i) => (
                  <li key={x} className="group relative isolate flex min-h-36 items-end overflow-hidden rounded-xl p-4 text-white shadow-md">
                    {/* Background photo from this destination's own set, rotated through the cards. */}
                    <Img src={photos[i % photos.length]} alt="" className="absolute inset-0 -z-20 size-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/55 to-brand-950/15" aria-hidden />
                    <span className="leading-snug font-semibold">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading title={fmt(t.destinations.food, { name })} />
              <ul className="space-y-3">
                {guide.food.map((f) => (
                  <li key={f.name.en} className="flex gap-3 rounded-xl bg-sand p-4">
                    <Utensils className="mt-0.5 size-5 shrink-0 text-accent-500" aria-hidden />
                    <span>
                      <span className="block font-bold">{l(f.name)}</span>
                      <span className="text-sm text-muted">{l(f.text)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className={`py-16 md:py-20 ${guide ? 'bg-mist' : ''}`}>
        <div className="container-x">
          <SectionHeading
            title={fmt(t.destinations.tours, { name })}
            action={
              relTours.length > 3 ? (
                <ButtonLink to={`${to('/tours')}?${d.kind === 'region' ? 'region' : 'dest'}=${d.slug}`} variant="outline">
                  {t.common.viewAll}
                </ButtonLink>
              ) : undefined
            }
          />
          {relTours.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relTours.slice(0, 6).map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-line bg-mist p-8 text-center text-muted">{t.destinations.noTours}</p>
          )}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16 md:py-20">
        <MapBackdrop />
        <div className={`container-x grid gap-12 ${guide ? 'lg:grid-cols-[1fr_1.3fr]' : ''}`}>
          {guide && (
            <div>
              <SectionHeading title={fmt(t.destinations.tips, { name })} />
              <ul className="space-y-3">
                {ll(guide.tips).map((x) => (
                  <li key={x} className="flex gap-3 leading-relaxed">
                    <Lightbulb className="mt-1 size-5 shrink-0 text-sun" aria-hidden />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <SectionHeading title={fmt(t.destinations.faq, { name })} />
            <Accordion
              items={faqs.map((x, i) => ({ key: `faq-${i}`, title: x.q, content: <p className="leading-relaxed text-muted">{x.a}</p> }))}
              open={faqOpen}
              onToggle={(k) =>
                setFaqOpen((cur) => {
                  const n = new Set(cur)
                  if (n.has(k)) n.delete(k)
                  else n.add(k)
                  return n
                })
              }
            />
          </div>
        </div>
      </section>

      {relPosts.length > 0 && (
        <section className="bg-sand py-16 md:py-20">
          <div className="container-x">
            <SectionHeading title={t.destinations.guides} />
            <div className="grid gap-6 md:grid-cols-3">
              {relPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title={fmt(t.destinations.cta, { name })} text={t.destinations.ctaText} image={d.image} ctaTo={`/tailor-made-tour?dest=${d.region ?? d.slug}`} />
    </>
  )
}

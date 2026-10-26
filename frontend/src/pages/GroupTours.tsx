import { CheckCircle2, UsersRound, Compass } from 'lucide-react'
import { tours } from '@/data/tours'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageHero from '@/components/ui/PageHero'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import TourCard from '@/components/tour/TourCard'
import CtaBanner from '@/components/sections/CtaBanner'

/** Service page for Group Tours & Tailor-made Tours, leading to the multi-step form. */
export default function GroupTours() {
  const { t, to } = useI18n()
  const g = t.group
  const samples = tours.filter((x) => x.days >= 5).sort((a, b) => a.order - b.order).slice(0, 3)
  const blocks = [
    { icon: UsersRound, title: g.groupTitle, text: g.groupText, points: g.groupPoints, image: '/images/cars/van16-white.webp', cta: `${to('/tailor-made-tour')}?type=group` },
    { icon: Compass, title: g.tailorTitle, text: g.tailorText, points: g.tailorPoints, image: '/images/tours/sunset-1.webp', cta: to('/tailor-made-tour') },
  ]
  return (
    <>
      <Seo title={g.eyebrow} description={g.intro} path="/group-tailor-made-tours" image="/images/tours/khamphadanhthangvietnam.webp" />
      <PageHero image="/images/tours/khamphadanhthangvietnam.webp" imageAlt={g.eyebrow} eyebrow={g.eyebrow} title={g.title} text={g.intro} crumbs={[{ label: g.eyebrow }]}>
        <ButtonLink to={to('/tailor-made-tour')} size="lg">
          {g.cta}
        </ButtonLink>
      </PageHero>

      <section className="py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {blocks.map(({ icon: Icon, title, text, points, image, cta }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="card h-full">
                <Img src={image} alt="" className="aspect-[16/9] w-full object-cover" />
                <div className="p-7">
                  <Icon className="size-8 text-accent-500" aria-hidden />
                  <h2 className="mt-3 text-2xl font-bold">{title}</h2>
                  <p className="mt-2 text-muted">{text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden /> {p}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink to={cta} variant="secondary" className="mt-7">
                    {g.cta}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="container-x">
          <SectionHeading title={g.processTitle} align="center" />
          <ol className="grid gap-6 md:grid-cols-4">
            {g.process.map((p, i) => (
              <li key={p.t} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">{i + 1}</span>
                <h3 className="mt-4 font-bold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading title={g.samplesTitle} />
          <div className="grid gap-6 md:grid-cols-3">
            {samples.map((x) => (
              <TourCard key={x.slug} tour={x} />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner steps={t.home.ctaSteps} />
    </>
  )
}

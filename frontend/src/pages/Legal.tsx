import type { ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import PageIntro from '@/components/sections/PageIntro'

export type LegalKind = 'privacy' | 'terms' | 'payment' | 'cancellation'

export const LEGAL_PATHS: Record<LegalKind, string> = {
  privacy: '/privacy-policy',
  terms: '/terms',
  payment: '/payment-policy',
  cancellation: '/cancellation-policy',
}

/** Paragraphs; runs of lines starting with "• " become a bulleted list. */
function Paragraphs({ lines }: { lines: string[] }) {
  const out: ReactNode[] = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('• ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('• ')) items.push(lines[i++].slice(2))
      i--
      out.push(
        <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-brand-500">
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>,
      )
    } else {
      out.push(<p key={i}>{lines[i]}</p>)
    }
  }
  return <div className="prose-body mt-3 space-y-3 [&_p+p]:mt-0">{out}</div>
}

/** Policy pages (payment, cancellation/changes, privacy, terms). Text is managed as CMS pages later. */
export default function Legal({ kind }: { kind: LegalKind }) {
  const { t, lang } = useI18n()
  const g = t.legal
  const content = {
    privacy: { title: g.privacyTitle, ...g.privacy },
    terms: { title: g.termsTitle, ...g.terms },
    payment: { title: g.paymentTitle, ...g.payment },
    cancellation: { title: g.cancelTitle, ...g.cancel },
  }[kind]
  const { title, intro, sections } = content
  const id = (i: number) => `section-${i + 1}`

  return (
    <>
      <Seo title={title} description={intro} path={LEGAL_PATHS[kind]} />
      <PageIntro crumbs={[{ label: title }]} title={title} image="/images/tours/hanoi7.webp" />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_260px] lg:gap-14">
        <article className="min-w-0 max-w-3xl">
          <p className="text-sm text-muted">{g.updated}</p>
          <p className="mt-4 text-lg leading-8 text-ink">{intro}</p>

          <nav aria-label={g.onThisPage} className="mt-8 rounded-xl border border-line bg-mist p-5 lg:hidden">
            <p className="text-sm font-bold tracking-wide uppercase">{g.onThisPage}</p>
            <ol className="mt-3 grid gap-1.5 text-[0.95rem] sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#${id(i)}`} className="text-brand-700 hover:underline">
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((s, i) => (
            <section key={s.h} id={id(i)} className="mt-10 scroll-mt-40">
              <h2 className="flex gap-3 font-display text-xl font-semibold sm:text-2xl">
                <span className="text-accent-500 tabular-nums">{i + 1}.</span>
                {s.h}
              </h2>
              <Paragraphs lines={s.p} />
            </section>
          ))}

          <div className="mt-12 rounded-2xl bg-brand-50 p-6">
            <h2 className="text-lg font-bold">{g.contactTitle}</h2>
            <p className="mt-1 text-muted">{g.contactText}</p>
            <p className="mt-4 font-semibold">{site.name}</p>
            <ul className="mt-2 space-y-2 text-[0.95rem]">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden /> {site.address[lang]}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                <a href={site.phoneHref} className="hover:text-brand-700">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                  WhatsApp {site.phone}
                </a>
              </li>
              {site.email && (
                <li className="flex gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                  <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </article>

        <aside className="hidden lg:block">
          <nav aria-label={g.onThisPage} className="sticky top-36 rounded-xl border border-line p-4">
            <p className="mb-2 px-2 text-xs font-bold tracking-wide uppercase">{g.onThisPage}</p>
            <ol className="space-y-0.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#${id(i)}`} className="flex gap-2 rounded-md px-2 py-1.5 leading-snug text-muted transition hover:bg-brand-50 hover:text-brand-700">
                    <span className="tabular-nums">{i + 1}.</span> {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </>
  )
}

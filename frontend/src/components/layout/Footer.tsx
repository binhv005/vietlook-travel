import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Mail, MapPin, Phone } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import PaymentBadges from './PaymentBadges'
import { site } from '@/data/site'
import { regions } from '@/data/destinations'
import { themes } from '@/data/themes'
import { useI18n } from '@/i18n'

export default function Footer() {
  const { t, l, to, lang } = useI18n()
  const col = (title: string, links: { label: string; path: string }[], extra?: ReactNode) => (
    <div>
      <h2 className="mb-4 text-sm font-bold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="space-y-2.5">
        {links.map((ln) => (
          <li key={ln.path}>
            <Link to={to(ln.path)} className="text-[0.95rem] text-white/70 transition hover:text-white">
              {ln.label}
            </Link>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  )

  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full bg-[url('/images/footer.webp')] bg-[length:100%_auto] bg-bottom bg-no-repeat opacity-55 max-md:bg-[length:auto_45%]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-950 from-40% via-brand-950/50 via-70% to-transparent" />
      <div className="container-x grid gap-12 pt-16 pb-40 md:grid-cols-2 md:pb-48 lg:pb-56 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={site.logo} alt={site.name} className="h-28 w-auto" loading="lazy" />
          <ul className="mt-6 space-y-4 text-[0.95rem] text-white/80">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex shrink-0">
                <MapPin className="size-5 text-sun" aria-hidden />
              </span>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {site.address[lang]}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex shrink-0">
                <Phone className="size-5 text-sun" aria-hidden />
              </span>
              <span>
                Hotline / WhatsApp:{' '}
                <a href={site.phoneHref} className="font-bold whitespace-nowrap text-white hover:text-sun">
                  {site.phone}
                </a>
              </span>
            </li>
            {site.email && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex shrink-0">
                  <Mail className="size-5 text-sun" aria-hidden />
                </span>
                <span>
                  Email:{' '}
                  <a href={`mailto:${site.email}`} className="font-bold text-white hover:text-sun">
                    {site.email}
                  </a>
                </span>
              </li>
            )}
          </ul>
        </div>
        {col(t.footer.services, [
          { label: t.nav.groupTours, path: '/group-tailor-made-tours' },
          { label: t.nav.tailorMade, path: '/tailor-made-tour' },
          { label: t.nav.tours, path: '/tours' },
          { label: l(themes.find((x) => x.slug === 'tailor-made')!.name), path: '/tour-themes/tailor-made' },
          { label: t.nav.car, path: '/private-car' },
          { label: t.nav.carQuote, path: '/private-car/quote' },
          { label: t.nav.visa, path: '/visa-fast-track' },
        ])}
        {col(t.footer.explore, [
          ...regions.map((r) => ({ label: l(r.name), path: `/destinations/${r.slug}` })),
          { label: t.nav.themes, path: '/tour-themes' },
          { label: t.nav.guide, path: '/travel-guide' },
        ])}
        {col(t.footer.company, [
          { label: t.nav.about, path: '/about-us' },
          { label: t.footer.payment, path: '/payment-policy' },
          { label: t.footer.cancellation, path: '/cancellation-policy' },
          { label: t.footer.terms, path: '/terms' },
          { label: t.footer.privacy, path: '/privacy-policy' },
        ], <PaymentBadges className="mt-6" />)}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x grid items-center justify-items-center gap-4 py-6 text-sm text-white/90 [text-shadow:0_1px_3px_rgb(0_0_0/0.8)] md:grid-cols-[1fr_auto_1fr]">
          <p className="text-center md:col-start-2">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 md:justify-self-end">
            <span>{t.footer.follow}</span>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex size-11 items-center justify-center rounded-full bg-brand-950/70 ring-1 ring-white/25 hover:bg-brand-950/90">
              <Facebook className="size-4" aria-hidden />
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex size-11 items-center justify-center rounded-full bg-brand-950/70 ring-1 ring-white/25 hover:bg-brand-950/90">
              <WhatsAppIcon className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

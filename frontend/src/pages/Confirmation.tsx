import { useParams } from 'react-router-dom'
import { CheckCircle2, Landmark, Mail, SearchX } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { getStoredRequest, isDemoMode } from '@/services/api'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import Seo from '@/components/ui/Seo'
import { ButtonLink } from '@/components/ui/Button'

/** Confirmation screen shown only after a request has been stored and a reference issued. */
export default function Confirmation() {
  const { reference = '' } = useParams()
  const { t, to } = useI18n()
  // In demo mode the record lives in this browser; with a real API the reference comes from the server.
  const stored = isDemoMode ? getStoredRequest(reference) : undefined
  const known = !isDemoMode || !!stored

  return (
    <>
      <Seo title={t.confirm.title} path={`/request-received/${reference}`} noindex />
      <section className="bg-sand py-16 md:py-24">
        <div className="container-x max-w-2xl">
          <div className="card p-8 text-center md:p-12">
            {known ? (
              <>
                <CheckCircle2 className="mx-auto size-16 text-emerald-600" aria-hidden />
                <h1 className="mt-6 text-3xl font-bold">{t.confirm.title}</h1>
                {stored && <p className="mt-2 font-semibold text-brand-700">{t.confirm.kinds[stored.kind]}</p>}
                <p className="mt-3 text-muted">{t.confirm.text}</p>
                <div className="mx-auto mt-8 max-w-sm rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 p-5">
                  <p className="text-xs font-bold tracking-wide text-muted uppercase">{t.confirm.ref}</p>
                  <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-brand-800 select-all">{reference}</p>
                  <p className="mt-2 text-xs text-muted">{t.confirm.refNote}</p>
                </div>
                <div className="mt-10 text-left">
                  <h2 className="font-bold">{t.confirm.next}</h2>
                  <ol className="mt-4 space-y-3">
                    {t.confirm.nextSteps.map((s, i) => (
                      <li key={s} className="flex items-center gap-3">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  {(!stored || stored.kind === 'booking' || stored.kind === 'car' || stored.kind === 'visa') && (
                    <p className="mt-6 flex gap-2 rounded-lg bg-mist p-4 text-sm">
                      <Landmark className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden /> {t.booking.paymentText}
                    </p>
                  )}
                  <p className="mt-6 flex gap-2 text-sm text-muted">
                    <Mail className="mt-0.5 size-4 shrink-0" aria-hidden /> {t.confirm.email}
                  </p>
                </div>
              </>
            ) : (
              <>
                <SearchX className="mx-auto size-14 text-brand-400" aria-hidden />
                <h1 className="mt-6 text-2xl font-bold">{t.confirm.notFoundTitle}</h1>
                <p className="mt-3 text-muted">{t.confirm.notFoundText}</p>
              </>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <ButtonLink to={to()}>{t.confirm.home}</ButtonLink>
              <ButtonLink to={to('/tours')} variant="outline">
                {t.confirm.more}
              </ButtonLink>
              <ButtonLink href={site.whatsappHref} variant="whatsapp">
                <WhatsAppIcon className="size-4" aria-hidden /> WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

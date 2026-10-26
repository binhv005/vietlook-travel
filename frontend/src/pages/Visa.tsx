import { useForm } from 'react-hook-form'
import { ArrowRight, Car, CheckCircle2, PlaneLanding, ShieldAlert, Stamp, UsersRound } from 'lucide-react'
import { visaFaqs } from '@/data/vehicles'
import { airportServices, fastTrackPackages, visaTypes } from '@/data/visa'
import { site } from '@/data/site'
import { useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { buttonClass } from '@/components/ui/Button'
import Img from '@/components/ui/Img'
import FaqList from '@/components/sections/FaqList'
import { Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules, todayISO } from '@/components/forms/rules'

/** Staggered hero photos: each sits at its own height so the row reads like a loose collage. Phones show only two (the welcome photo reappears further down). */
const HERO_PHOTOS = [
  { src: '/images/tours/airport-pick-up-one-way.webp', cls: 'aspect-[4/4.4]' },
  { src: '/images/tours/welcome-vietlook.webp', cls: 'aspect-[4/3.2] mt-6 max-md:hidden' },
  { src: '/images/cars/minivan-golf.webp', cls: 'aspect-[4/4.2] md:-mt-3' },
  { src: '/images/tours/hanoi-12.webp', cls: 'aspect-[4/3.2] mt-6 max-md:hidden' },
]
/** Small four-point sparkle doodle. */
function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden className={`pointer-events-none -z-10 ${className}`}>
      <path d="M12 2c.6 5 2 6.6 7 7.2v1.6c-5 .6-6.4 2.2-7 7.2h-0c-.6-5-2-6.6-7-7.2V9.2c5-.6 6.4-2.2 7-7.2Z" />
    </svg>
  )
}

/** Three small open circles doodle. */
function Rings({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden className={`pointer-events-none -z-10 ${className}`}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="26" cy="13" r="5" />
      <circle cx="15" cy="31" r="3.5" />
    </svg>
  )
}

/** Icons for "Requests we review": tourist visa, group visa, fast-track, arrival transfer. */
const SUPPORTED_ICONS = [Stamp, UsersRound, PlaneLanding, Car]

interface VisaValues extends ContactValues {
  service: string
  nationality: string
  travellers: number
  arrival: string
  airport: string
  flight: string
  notes: string
}

export default function Visa() {
  const { t, l, lang } = useI18n()
  const r = makeRules(t)
  const { submit, sending, errorMessage, honeypot } = useSubmit('visa')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<VisaValues>({ mode: 'onTouched', defaultValues: { service: 'visa', travellers: 1, airport: 'HAN', language: lang } })
  const err = (k: keyof VisaValues) => errors[k]?.message as string | undefined
  const icons = [Stamp, PlaneLanding, CheckCircle2, UsersRound]

  return (
    <>
      <Seo title={t.visa.heroEyebrow} description={t.visa.heroText} path="/visa-fast-track" image="/images/tours/airport-pick-up-one-way.webp" />
      {/* Hero: a band with the airport photo under a warm wash, a centred title and doodles, and four staggered photos overlapping its lower edge. */}
      <section className="relative isolate overflow-hidden pt-10 pb-6">
        <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100%-7rem)] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_88%,0_100%)] md:h-[calc(100%-9rem)]" aria-hidden>
          <img src="/images/tours/airport-pick-up-one-way.webp" alt="" fetchPriority="high" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdebd3]/90 via-[#fdebd3]/85 to-[#fdebd3]/70" />
        </div>
        <Sparkle className="absolute top-16 left-[12%] hidden size-6 text-brand-900 md:block" />
        <Sparkle className="absolute top-[38%] right-[14%] size-7 text-accent-500" />
        <Rings className="absolute top-10 right-[22%] hidden text-brand-900 md:block" />
        <div className="container-x">
          <div className="[&_ol]:justify-center">
            <Breadcrumb items={[{ label: t.nav.visa }]} />
          </div>
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <p className="eyebrow mb-3">{t.visa.heroEyebrow}</p>
            <h1 className="h-display">{t.visa.heroTitle}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t.visa.heroText}</p>
            <a href="#visa-form" className={`mt-7 ${buttonClass('primary', 'lg')}`}>
              {t.visa.formTitle} <ArrowRight className="size-5" aria-hidden />
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 items-start gap-4 md:grid-cols-4 md:gap-5">
            {HERO_PHOTOS.map((ph, i) => (
              <Img
                key={ph.src}
                src={ph.src}
                alt={i === 0 ? l({ en: 'International airport terminal in Vietnam', zh: '越南国际机场航站楼' }) : ''}
                priority={i < 2}
                className={`w-full rounded-2xl object-cover shadow-xl ring-4 ring-white ${ph.cls}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What we can help with: a big heading on the left, the four services as a two-by-two text list on the right. */}
      <section className="py-16 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="h-section lg:text-[2.6rem]!">{t.visa.overviewTitle}</h2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.visa.overview.map((o, i) => {
              const Icon = icons[i]
              return (
                <div key={o.t}>
                  <h3 className="flex items-center gap-2.5 font-bold">
                    <Icon className="size-5 text-accent-500" aria-hidden /> {o.t}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">{o.d}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Requests we review: photo with a floating caption card on the left; text, checklist and the warning as a quote on the right. */}
      <section className="pb-20">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-lg pb-10 lg:max-w-none">
            <Img src="/images/tours/welcome-vietlook.webp" alt="" className="aspect-[4/3] w-full rounded-3xl object-cover object-[50%_35%] shadow-xl" />
            <div className="absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-center shadow-xl sm:left-10 sm:w-auto sm:translate-x-0">
              <p className="font-display text-lg font-semibold">“{t.home.visaTitle}”</p>
              <p className="mt-1 text-sm text-muted">{site.name}</p>
            </div>
          </div>
          <div>
            <h2 className="h-section">{t.visa.supportedTitle}</h2>
            <p className="prose-body mt-4">{t.visa.supportedText}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.visa.supported.map((x, i) => {
                const Icon = SUPPORTED_ICONS[i % SUPPORTED_ICONS.length]
                return (
                  <li key={x} className="flex items-start gap-3 font-medium">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="pt-1.5 leading-snug">{x}</span>
                  </li>
                )
              })}
            </ul>
            <blockquote role="note" className="mt-8">
              <p className="flex items-center gap-2 font-bold">
                <ShieldAlert className="size-5 text-sun" aria-hidden /> {t.visa.warningTitle}
              </p>
              <p className="mt-1.5 leading-relaxed text-ink/80 italic">{t.visa.warning}</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Visa types and fast-track packages: centred headings over the two tables. */}
      <section className="relative isolate bg-mist py-20" aria-labelledby="visa-types">
        <Sparkle className="absolute top-14 left-[16%] hidden size-6 text-accent-500 md:block" />
        <Rings className="absolute top-10 right-[18%] hidden text-brand-900 md:block" />
        <div className="container-x space-y-16">
          <div>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 id="visa-types" className="h-section">
                {t.visa.typesTitle}
              </h2>
              <p className="mt-3 text-muted">{t.visa.typesText}</p>
            </div>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_10px_40px_rgba(15,40,70,0.10)] ring-1 ring-brand-100">
              <table className="w-full text-left text-[0.95rem] sm:min-w-[560px] max-sm:[&_td]:block max-sm:[&_td]:pt-0 max-sm:[&_th[scope=row]]:block max-sm:[&_th[scope=row]]:pb-2">
                <thead className="bg-brand-700 max-sm:hidden text-xs tracking-wider text-white uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colType}</th>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colProcessing}</th>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colFee}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50 [&>tr:nth-child(even)]:bg-brand-50/50 [&>tr]:transition-colors [&>tr:hover]:bg-sun/10">
                  {visaTypes.map((v) => (
                    <tr key={v.key}>
                      <th scope="row" className="px-5 py-4 align-top font-normal">
                        <span className="font-semibold text-ink">{l(v.name)}</span>
                        <span className="mt-1 block text-muted">{l(v.description)}</span>
                      </th>
                      <td className="px-5 py-4 align-top"><span className="mb-1 block text-xs font-bold tracking-wider text-muted uppercase sm:hidden">{t.visa.colProcessing}</span>{v.processing ? l(v.processing) : <span className="inline-block rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-accent-600">{t.visa.onRequest}</span>}</td>
                      <td className="px-5 py-4 align-top"><span className="mb-1 block text-xs font-bold tracking-wider text-muted uppercase sm:hidden">{t.visa.colFee}</span>{v.fee ?? <span className="inline-block rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-accent-600">{t.visa.onRequest}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <h2 className="h-section">{t.visa.fastTitle}</h2>
              <p className="mt-3 text-muted">{t.visa.fastText}</p>
            </div>
            <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_10px_40px_rgba(15,40,70,0.10)] ring-1 ring-brand-100">
              <table className="w-full text-left text-[0.95rem] sm:min-w-[560px] max-sm:[&_td]:block max-sm:[&_td]:pt-0 max-sm:[&_th[scope=row]]:block max-sm:[&_th[scope=row]]:pb-2">
                <thead className="bg-brand-700 max-sm:hidden text-xs tracking-wider text-white uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colAirport}</th>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colPackages}</th>
                    <th scope="col" className="px-5 py-4 font-bold">{t.visa.colFee}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50 [&>tr:nth-child(even)]:bg-brand-50/50 [&>tr]:transition-colors [&>tr:hover]:bg-sun/10">
                  {airportServices.map((a) => (
                    <tr key={a.code}>
                      <th scope="row" className="px-5 py-4 align-top">
                        <span className="font-semibold text-ink">{l(a.name)}</span> <span className="ml-1 rounded bg-brand-600 px-1.5 py-0.5 text-[0.7rem] font-bold text-white">{a.code}</span>
                      </th>
                      <td className="px-5 py-4 align-top">
                        <span className="mb-1 block text-xs font-bold tracking-wider text-muted uppercase sm:hidden">{t.visa.colPackages}</span>
                        <ul className="flex flex-wrap gap-1.5">
                          {a.packages.map((k) => {
                            const pk = fastTrackPackages.find((x) => x.key === k)
                            return pk ? (
                              <li key={k} title={l(pk.description)} className="rounded-full border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-700">
                                {l(pk.name)}
                              </li>
                            ) : null
                          })}
                        </ul>
                      </td>
                      <td className="px-5 py-4 align-top"><span className="mb-1 block text-xs font-bold tracking-wider text-muted uppercase sm:hidden">{t.visa.colFee}</span>{a.fee ?? <span className="inline-block rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-accent-600">{t.visa.onRequest}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm text-muted md:grid-cols-2">
              {fastTrackPackages.map((pk) => (
                <li key={pk.key}>
                  <strong className="text-ink">{l(pk.name)}:</strong> {l(pk.description)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-clip bg-sand py-20">
        {/* Background photo under a light wash so the FAQ text stays readable. */}
        <Img src="/images/tours/airport-pick-up-one-way.webp" alt="" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sand via-sand/90 to-sand/60" aria-hidden />
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {/* The FAQ stays in view (below the header) while the longer form scrolls past on wide screens. */}
          <div className="lg:sticky lg:top-[180px] lg:h-fit">
            <h2 className="h-section mb-6">{t.visa.faqTitle}</h2>
            <FaqList faqs={visaFaqs} />
          </div>
          <form id="visa-form" onSubmit={handleSubmit((v) => submit({ ...v, locale: lang }))} noValidate className="card relative h-fit space-y-5 p-6 shadow-xl md:p-8">
            <h2 className="text-2xl font-bold">{t.visa.formTitle}</h2>
            <Honeypot inputRef={honeypot} />
            {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
            <FormAlert message={errorMessage} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="vf-service" label={t.visa.service} required error={err('service')} className="sm:col-span-2">
                <select className="field-input" {...register('service', r.required)}>
                  {(Object.keys(t.visa.services) as Array<keyof typeof t.visa.services>).map((k) => (
                    <option key={k} value={k}>
                      {t.visa.services[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="vf-nat" label={t.booking.nationality} required error={err('nationality')}>
                <input className="field-input" autoComplete="country-name" {...register('nationality', r.text(80))} />
              </Field>
              <Field id="vf-trav" label={t.visa.travellers} required error={err('travellers')}>
                <input type="number" min={1} max={200} className="field-input" {...register('travellers', r.int(1, 200))} />
              </Field>
              <Field id="vf-arrival" label={t.visa.arrival} required error={err('arrival')}>
                <input type="date" min={todayISO()} className="field-input" {...register('arrival', r.futureDate())} />
              </Field>
              <Field id="vf-airport" label={t.visa.airport} error={err('airport')}>
                <select className="field-input" {...register('airport')}>
                  {(Object.keys(t.visa.airports) as Array<keyof typeof t.visa.airports>).map((k) => (
                    <option key={k} value={k}>
                      {t.visa.airports[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="vf-flight" label={t.visa.flight} error={err('flight')} className="sm:col-span-2">
                <input className="field-input uppercase" placeholder={t.carQuote.flightPh} {...register('flight', r.optionalText(20))} />
              </Field>
            </div>
            <ContactFields<VisaValues> register={register} errors={errors} idPrefix="vf" />
            <Field id="vf-notes" label={t.carQuote.notes} error={err('notes')}>
              <textarea rows={3} className="field-input" {...register('notes', r.optionalText(2000))} />
            </Field>
            <SubmitBar sending={sending} label={t.visa.submit} />
          </form>
        </div>
      </section>
    </>
  )
}

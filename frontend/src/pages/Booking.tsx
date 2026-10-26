import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Calculator, CheckCircle2, Clock, Info, Landmark, Mail, MapPin, Users } from 'lucide-react'
import { getTour, tours } from '@/data/tours'
import { fmt, useDuration, useI18n } from '@/i18n'
import { formatDate } from '@/components/guide/PostCard'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import Img from '@/components/ui/Img'
import PageIntro from '@/components/sections/PageIntro'
import { Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules } from '@/components/forms/rules'
import { useTodayISO } from '@/hooks/useClientValue'

interface BookingValues extends ContactValues {
  tour: string
  date: string
  adults: number
  children: number
  childAges: number[]
  room: string
  guideLanguage: string
  nationality: string
  requests: string
}

export default function Booking() {
  const { tourSlug } = useParams()
  const { t, l, lang } = useI18n()
  const today = useTodayISO()
  const duration = useDuration()
  const r = makeRules(t)
  const { submit, sending, errorMessage, honeypot } = useSubmit('booking')
  const initial = getTour(tourSlug ?? '') ?? undefined

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted, isValid },
  } = useForm<BookingValues>({
    mode: 'onTouched',
    // Child-age inputs that disappear when the child count drops are removed from the payload.
    shouldUnregister: true,
    defaultValues: { tour: initial?.slug ?? '', adults: 2, children: 0, room: 'superior', guideLanguage: lang, language: lang, nationality: '', requests: '' },
  })

  const selected = getTour(watch('tour'))
  const adults = Math.max(0, Number(watch('adults')) || 0)
  const children = Math.min(40, Math.max(0, Number(watch('children')) || 0))
  // Estimate only when the tour has a price; child rates depend on age and are quoted separately.
  const estimate = selected?.priceFrom != null ? adults * selected.priceFrom : null

  const onSubmit = (v: BookingValues) =>
    submit({
      ...v,
      tourTitle: selected ? selected.title.en : '',
      estimatedAdultsUSD: estimate,
      estimateIsSample: !!selected?.priceIsSample,
      locale: lang,
    })

  return (
    <>
      <Seo title={t.booking.title} description={t.booking.intro} path={tourSlug ? `/booking/${tourSlug}` : '/booking'} noindex />
      <PageIntro
        crumbs={[{ label: t.nav.tours, to: '/tours' }, ...(selected ? [{ label: l(selected.title), to: `/tours/${selected.slug}` }] : []), { label: t.booking.title }]}
        title={t.booking.title}
        intro={t.booking.intro}
        image={selected?.image ?? '/images/tours/emperor-cruises.webp'}
      />
      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-8">
          <Honeypot inputRef={honeypot} />
          {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
          <FormAlert message={errorMessage} />

          <fieldset className="card space-y-5 p-6">
            <legend className="sr-only">{t.booking.selected}</legend>
            <Field id="bk-tour" label={t.booking.selected} required error={errors.tour?.message}>
              <select className="field-input" {...register('tour', r.required)}>
                <option value="">{t.form.select}</option>
                {tours.map((x) => (
                  <option key={x.slug} value={x.slug}>
                    {l(x.title)}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              {selected?.departures?.length ? (
                <Field id="bk-date" label={t.booking.departure} required error={errors.date?.message}>
                  <select className="field-input" {...register('date', r.required)}>
                    <option value="">{t.form.select}</option>
                    {selected.departures
                      .filter((d) => d >= today)
                      .map((d) => (
                        <option key={d} value={d}>
                          {formatDate(d, lang)}
                        </option>
                      ))}
                  </select>
                </Field>
              ) : (
                <Field id="bk-date" label={t.booking.date} required error={errors.date?.message}>
                  <input type="date" min={today || undefined} className="field-input" {...register('date', r.futureDate())} />
                </Field>
              )}
              <Field id="bk-adults" label={t.booking.adults} required error={errors.adults?.message}>
                <input type="number" min={1} max={60} className="field-input" {...register('adults', r.int(1, 60))} />
              </Field>
              <Field id="bk-children" label={t.booking.children} error={errors.children?.message}>
                <input type="number" min={0} max={40} className="field-input" {...register('children', r.int(0, 40, false))} />
              </Field>
            </div>
            {children > 0 && (
              <div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {Array.from({ length: children }, (_, i) => (
                    <Field key={i} id={`bk-child-${i}`} label={fmt(t.booking.childAge, { n: i + 1 })} error={errors.childAges?.[i]?.message}>
                      <input type="number" min={0} max={17} inputMode="numeric" className="field-input" {...register(`childAges.${i}` as const, r.int(0, 17, false))} />
                    </Field>
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted">{t.booking.childAgesHint}</p>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="bk-room" label={t.booking.room} error={errors.room?.message}>
                <select className="field-input" {...register('room')}>
                  {(['standard', 'superior', 'luxury'] as const).map((k) => (
                    <option key={k} value={k}>
                      {t.tourLevel[k]}
                    </option>
                  ))}
                  <option value="unsure">{t.tailor.hotels.mixed}</option>
                </select>
              </Field>
              <Field id="bk-guide" label={t.booking.language} error={errors.guideLanguage?.message}>
                <select className="field-input" {...register('guideLanguage')}>
                  {(Object.keys(t.form.languages) as Array<keyof typeof t.form.languages>).map((k) => (
                    <option key={k} value={k}>
                      {t.form.languages[k]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="bk-nat" label={t.booking.nationality} hint={t.booking.nationalityHint} error={errors.nationality?.message} className="sm:col-span-2">
                <input className="field-input" autoComplete="country-name" {...register('nationality', r.optionalText(80))} />
              </Field>
            </div>
            <Field id="bk-req" label={t.booking.requests} error={errors.requests?.message}>
              <textarea rows={4} className="field-input" placeholder={t.booking.requestsPh} {...register('requests', r.optionalText(2000))} />
            </Field>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="sr-only">{t.form.name}</legend>
            <ContactFields<BookingValues> register={register} errors={errors} idPrefix="bk" />
          </fieldset>

          <SubmitBar sending={sending} label={t.booking.submit} center />
        </form>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="card">
            {selected ? (
              <>
                <Img src={selected.image} alt="" className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-bold tracking-wide text-muted uppercase">{t.booking.summary}</p>
                  <h2 className="mt-1 text-lg leading-snug font-bold">{l(selected.title)}</h2>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    <li className="flex items-center gap-2">
                      <Clock className="size-4 text-brand-500" aria-hidden /> {duration(selected.days, selected.nights)}
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-brand-500" aria-hidden /> {l(selected.route)}
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="size-4 text-brand-500" aria-hidden /> {t.booking.travellers}: {adults} + {children}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <p className="p-5 text-sm text-muted">{t.form.select}</p>
            )}
            <div className="border-t border-line p-5 text-sm" aria-live="polite">
              <h3 className="flex items-center gap-2 font-bold">
                <Calculator className="size-4 text-brand-600" aria-hidden /> {t.booking.estimateTitle}
              </h3>
              {selected && estimate != null ? (
                <dl className="mt-3 space-y-1.5">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">{fmt(t.booking.estimateAdults, { n: adults, p: selected.priceFrom!.toLocaleString('en-US') })}</dt>
                    <dd className="font-semibold">USD {estimate.toLocaleString('en-US')}</dd>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">{fmt(t.booking.estimateChildren, { n: children })}</dt>
                      <dd className="font-semibold">—</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3 border-t border-line pt-2 text-base">
                    <dt className="font-bold">{t.booking.estimateTotal}</dt>
                    <dd className="font-bold text-accent-600">USD {estimate.toLocaleString('en-US')}</dd>
                  </div>
                  <p className="pt-1 text-xs text-muted">{t.booking.estimateNote}</p>
                </dl>
              ) : (
                <p className="mt-2 flex gap-2 text-muted">
                  <Info className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden />
                  {t.booking.priceNote}
                </p>
              )}
            </div>
            <div className="border-t border-line p-5 text-sm">
              <h3 className="flex items-center gap-2 font-bold">
                <Landmark className="size-4 text-brand-600" aria-hidden /> {t.booking.paymentTitle}
              </h3>
              <p className="mt-2 text-muted">{t.booking.paymentText}</p>
              <p className="mt-3 flex items-center gap-2 font-semibold text-emerald-700">
                <CheckCircle2 className="size-4" aria-hidden /> {t.booking.noPayment}
              </p>
              <p className="mt-2 flex gap-2 text-xs text-muted">
                <Mail className="mt-0.5 size-3.5 shrink-0" aria-hidden /> {t.booking.emailNote}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

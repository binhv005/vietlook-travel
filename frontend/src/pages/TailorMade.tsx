import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, type FieldPath } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { regions } from '@/data/destinations'
import { getTour } from '@/data/tours'
import { site } from '@/data/site'
import { fmt, useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import PageIntro from '@/components/sections/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import { ChoiceGroup, Chip, Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules, todayISO } from '@/components/forms/rules'

interface TailorValues extends ContactValues {
  regions: string[]
  startDate: string
  flexible: boolean
  length: number
  guests: number
  guestType: string
  styles: string[]
  budget: string
  hotel: string
  services: string[]
  company: string
  details: string
}

const STORAGE_KEY = 'vietlook:tailor-draft'
const THEME_TO_STYLE: Record<string, string> = {
  'culture-heritage': 'culture',
  'family-holidays': 'family',
  honeymoon: 'honeymoon',
  'luxury-private-tours': 'luxury',
  'photography-tours': 'nature',
}

const STEP_FIELDS: FieldPath<TailorValues>[][] = [
  ['regions', 'startDate', 'length', 'guests', 'guestType'],
  ['styles', 'budget', 'hotel'],
  ['name', 'email', 'whatsapp', 'language', 'company', 'details'],
]

function loadDraft(): Partial<TailorValues> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

/** Three-step tailor-made request (trip & group, style & budget, contact) with per-step validation and draft persistence. */
export default function TailorMade() {
  const { t, l, lang } = useI18n()
  const r = makeRules(t)
  const [sp] = useSearchParams()
  const [step, setStep] = useState(0)
  const { submit, sending, errorMessage, honeypot } = useSubmit('tailor')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const steps = t.tailor.steps

  const defaults = useMemo<Partial<TailorValues>>(() => {
    const draft = loadDraft()
    const tour = getTour(sp.get('tour') ?? '')
    const dest = sp.get('dest')
    const theme = sp.get('theme')
    return {
      regions: dest && regions.some((x) => x.slug === dest) ? [dest] : tour ? tour.regions : [],
      flexible: false,
      length: tour?.days ?? 10,
      guests: 2,
      guestType: sp.get('type') === 'group' ? 'group' : 'individual',
      styles: theme && THEME_TO_STYLE[theme] ? [THEME_TO_STYLE[theme]] : [],
      budget: 'unsure',
      hotel: '4',
      services: [],
      language: lang,
      details: tour ? `${t.tour.customise}: ${l(tour.title)}\n` : '',
      ...draft,
    }
    // Defaults are computed once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
    // Re-validate on change: errors clear as soon as a chip is picked, instead of on blur
    // (blur-time re-validation shifted the layout under the pointer mid-click).
  } = useForm<TailorValues>({ mode: 'onChange', defaultValues: defaults })

  // Keep the draft while the visitor moves between steps or reloads the page.
  useEffect(() => {
    const sub = watch((v) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v))
      } catch {
        /* storage unavailable – keep working without persistence */
      }
    })
    return () => sub.unsubscribe()
  }, [watch])

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  const flexible = watch('flexible')
  const last = step === steps.length - 1

  // Re-check the start date once the new "required" rule has been registered.
  useEffect(() => {
    if (errors.startDate) void trigger('startDate')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flexible])

  const next = async () => {
    if (await trigger(STEP_FIELDS[step])) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const onSubmit = async (v: TailorValues) => {
    await submit({ ...v, locale: lang })
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  const err = (k: keyof TailorValues) => errors[k]?.message as string | undefined
  const atLeastOne = { validate: (v: string[] | string | boolean) => (Array.isArray(v) ? v.length > 0 : !!v) || t.form.errChoose }

  return (
    <>
      <Seo title={t.tailor.title} description={t.tailor.intro} path="/tailor-made-tour" />
      <PageIntro crumbs={[{ label: t.nav.tailorMade }]} title={t.tailor.title} intro={t.tailor.intro} image="/images/tours/da-lat.webp" />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={(e) => {
            // Enter key on earlier steps moves forward instead of submitting.
            if (!last) {
              e.preventDefault()
              void next()
              return
            }
            void handleSubmit(onSubmit)(e)
          }}
          noValidate
          className="relative"
        >
          <Honeypot inputRef={honeypot} />

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-brand-700">{fmt(t.tailor.stepOf, { n: step + 1, total: steps.length })}</span>
              <span className="text-muted">{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-50" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label={fmt(t.tailor.stepOf, { n: step + 1, total: steps.length })}>
              <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            <ol className="mt-4 hidden gap-2 sm:grid sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s} className={`flex items-center gap-2 text-xs font-semibold ${i <= step ? 'text-brand-700' : 'text-muted'}`}>
                  <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] ${i < step ? 'bg-brand-600 text-white' : i === step ? 'border-2 border-brand-600' : 'border border-line'}`}>
                    {i < step ? <Check className="size-3.5" aria-hidden /> : i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <div className="card space-y-6 p-6 md:p-8">
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              {steps[step]}
            </h2>

            {step === 0 && (
              <>
                <ChoiceGroup legend={t.tailor.where} hint={t.tailor.whereHint} required error={err('regions')}>
                  {regions.map((x) => (
                    <Chip key={x.slug} value={x.slug} label={l(x.name)} {...register('regions', atLeastOne)} />
                  ))}
                  <Chip value="unsure" label={t.tailor.budgets.unsure} {...register('regions', atLeastOne)} />
                </ChoiceGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="tm-date" label={t.tailor.startDate} required={!flexible} error={err('startDate')}>
                    <input type="date" min={todayISO()} className="field-input" {...register('startDate', r.futureDate(!flexible))} />
                  </Field>
                  <Field id="tm-length" label={t.tailor.length} required error={err('length')}>
                    <input type="number" min={1} max={60} className="field-input" {...register('length', r.int(1, 60))} />
                  </Field>
                </div>
                <label className="flex items-center gap-2.5 text-sm font-medium">
                  <input type="checkbox" className="size-4 accent-brand-600" {...register('flexible')} />
                  {t.tailor.flexible}
                </label>
                <Field id="tm-guests" label={t.tailor.guests} required error={err('guests')} className="max-w-xs">
                  <input type="number" min={1} max={500} className="field-input" {...register('guests', r.int(1, 500))} />
                </Field>
                <ChoiceGroup legend={t.tailor.guestType} error={err('guestType')}>
                  {(Object.keys(t.tailor.guestTypes) as Array<keyof typeof t.tailor.guestTypes>).map((k) => (
                    <Chip key={k} type="radio" value={k} label={t.tailor.guestTypes[k]} {...register('guestType')} />
                  ))}
                </ChoiceGroup>
              </>
            )}

            {step === 1 && (
              <>
                <ChoiceGroup legend={t.tailor.style} hint={t.tailor.styleHint} error={err('styles')}>
                  {(Object.keys(t.tailor.styles) as Array<keyof typeof t.tailor.styles>).map((k) => (
                    <Chip key={k} value={k} label={t.tailor.styles[k]} {...register('styles')} />
                  ))}
                </ChoiceGroup>
                <ChoiceGroup legend={t.tailor.budget} error={err('budget')}>
                  {(Object.keys(t.tailor.budgets) as Array<keyof typeof t.tailor.budgets>).map((k) => (
                    <Chip key={k} type="radio" value={k} label={t.tailor.budgets[k]} {...register('budget')} />
                  ))}
                </ChoiceGroup>
                <ChoiceGroup legend={t.tailor.hotel} error={err('hotel')}>
                  {(Object.keys(t.tailor.hotels) as Array<keyof typeof t.tailor.hotels>).map((k) => (
                    <Chip key={k} type="radio" value={k} label={t.tailor.hotels[k]} {...register('hotel')} />
                  ))}
                </ChoiceGroup>
                <ChoiceGroup legend={t.tailor.services}>
                  {(Object.keys(t.tailor.serviceOpts) as Array<keyof typeof t.tailor.serviceOpts>).map((k) => (
                    <Chip key={k} value={k} label={t.tailor.serviceOpts[k]} {...register('services')} />
                  ))}
                </ChoiceGroup>
              </>
            )}

            {step === 2 && (
              <>
                <ContactFields<TailorValues> register={register} errors={errors} idPrefix="tm" />
                <Field id="tm-company" label={t.tailor.company} error={err('company')}>
                  <input className="field-input" autoComplete="organization" {...register('company', r.optionalText(120))} />
                </Field>
                <Field id="tm-details" label={t.tailor.details} error={err('details')}>
                  <textarea rows={5} className="field-input" placeholder={t.tailor.detailsPh} {...register('details', r.optionalText(3000))} />
                </Field>
                <FormAlert message={errorMessage} />
              </>
            )}

            {/* Last step: the submit button is centred, with Back underneath; other steps keep Back / Next at either end. */}
            <div className={`flex flex-col-reverse gap-3 border-t border-line pt-6 ${last ? 'items-center' : 'sm:flex-row sm:items-start sm:justify-between'}`}>
              {step > 0 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-semibold hover:border-brand-400">
                  <ArrowLeft className="size-4" aria-hidden /> {t.common.back}
                </button>
              ) : (
                !last && <span />
              )}
              {last ? (
                <SubmitBar sending={sending} label={t.tailor.submit} />
              ) : (
                <button type="button" onClick={() => void next()} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 font-semibold text-white hover:bg-brand-700">
                  {t.common.next} <ArrowRight className="size-4" aria-hidden />
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Save className="size-4" aria-hidden /> {t.tailor.saved}
          </p>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:h-fit">
          <img src="/images/tours/khamphavedepvietnamhuehoiansapa.webp" alt="" className="hidden aspect-[4/3] w-full rounded-2xl object-cover lg:block" loading="lazy" />
          {/* Photo card: Ninh Binh boats under a dark wash, white text on top. */}
          <div className="relative isolate overflow-hidden rounded-2xl bg-brand-950 p-6 text-white shadow-lg">
            <img src="/images/tours/dulichninhbinhthang12cogidep8.webp" alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/80 via-brand-950/70 to-brand-950/90" aria-hidden />
            <h2 className="font-bold text-white">{t.home.ctaTitle}</h2>
            <ol className="mt-4 space-y-3">
              {t.home.ctaSteps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm font-medium">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-sun text-xs font-bold text-brand-950">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <ButtonLink href={site.whatsappHref} variant="whatsapp" className="mt-6 w-full">
              <WhatsAppIcon className="size-4" aria-hidden /> {t.common.chatWhatsapp}
            </ButtonLink>
          </div>
        </aside>
      </div>
    </>
  )
}

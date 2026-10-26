import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { regions } from '@/data/destinations'
import { useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import { Field, FormAlert, Honeypot, SubmitBar } from '../forms/Field'
import ContactFields, { type ContactValues } from '../forms/ContactFields'
import { makeRules, todayISO } from '../forms/rules'
import Img from '../ui/Img'

interface PlanValues extends ContactValues {
  destination: string
  startDate: string
  guests: number
  message: string
}

// Label / control / message share rows across the columns, so a wrapped label never pushes its control out of line.
const cell = 'sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-y-0'

/** Short "plan your trip" form on the homepage; stored as a tailor-made request. */
export default function PlanTripForm() {
  const { t, l, to, lang } = useI18n()
  const r = makeRules(t)
  const { submit, sending, errorMessage, honeypot } = useSubmit('tailor')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<PlanValues>({ mode: 'onTouched', defaultValues: { destination: '', guests: 2, language: lang } })

  return (
    <section className="relative isolate overflow-hidden bg-brand-900 py-20 md:py-24" aria-labelledby="home-plan">
      <Img src="/images/tours/the-best-lotus-viewing-spots-in-ninh-binh.webp" alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-30" />
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div className="text-white">
          <p className="eyebrow mb-3 text-sun">{t.home.planEyebrow}</p>
          <h2 id="home-plan" className="h-section text-white">
            {t.home.planTitle}
          </h2>
          <p className="mt-4 text-lg text-white/80">{t.home.planText}</p>
          <ol className="mt-8 space-y-3">
            {t.home.ctaSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 font-medium">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-sun font-bold text-brand-950">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <Link to={to('/tailor-made-tour')} className="mt-8 inline-flex items-center gap-1.5 font-bold text-sun hover:underline">
            {t.home.planFull} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit((v) => submit({ ...v, regions: v.destination ? [v.destination] : [], source: 'homepage-plan-form', locale: lang }))}
          noValidate
          className="relative space-y-5 rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        >
          <Honeypot inputRef={honeypot} />
          {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
          <FormAlert message={errorMessage} />
          <div className="grid gap-5 sm:grid-cols-3">
            <Field id="hp-dest" className={cell} label={t.home.planDestination} error={errors.destination?.message}>
              <select className="field-input" {...register('destination')}>
                <option value="">{t.home.searchAny}</option>
                {regions.map((x) => (
                  <option key={x.slug} value={x.slug}>
                    {l(x.name)}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="hp-date" className={cell} label={t.tailor.startDate} error={errors.startDate?.message}>
              <input type="date" min={todayISO()} className="field-input" {...register('startDate', r.futureDate(false))} />
            </Field>
            <Field id="hp-guests" className={cell} label={t.tailor.guests} required error={errors.guests?.message}>
              <input type="number" min={1} max={500} className="field-input" {...register('guests', r.int(1, 500))} />
            </Field>
          </div>
          <ContactFields<PlanValues> register={register} errors={errors} idPrefix="hp" withLanguage={false} />
          <Field id="hp-msg" label={t.home.planMessage} error={errors.message?.message}>
            <textarea rows={3} className="field-input" placeholder={t.tailor.detailsPh} {...register('message', r.optionalText(2000))} />
          </Field>
          <SubmitBar sending={sending} label={t.home.planSubmit} center />
        </form>
      </div>
    </section>
  )
}

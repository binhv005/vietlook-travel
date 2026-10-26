import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { fmt, useI18n } from '@/i18n'
import { useSubmit } from '@/hooks/useSubmit'
import Seo from '@/components/ui/Seo'
import PageIntro from '@/components/sections/PageIntro'
import Img from '@/components/ui/Img'
import { Field, FormAlert, Honeypot, SubmitBar } from '@/components/forms/Field'
import ContactFields, { type ContactValues } from '@/components/forms/ContactFields'
import { makeRules, todayISO } from '@/components/forms/rules'

const SERVICES = ['airport', 'daily', 'intercity', 'multiday', 'group'] as const
type Service = (typeof SERVICES)[number]

/** Shown while no vehicle is chosen: the main photo of each vehicle type in turn, every 2 seconds. */
function VehicleCycle() {
  const { t, l } = useI18n()
  const list = vehicles.filter((v): v is typeof v & { image: string } => !!v.image)
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % list.length), 2000)
    return () => clearInterval(id)
  }, [list.length])
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-white to-brand-50">
      {list.map((v, n) => (
        <Img
          key={v.slug}
          src={v.image}
          alt={n === i ? l(v.name) : ''}
          aria-hidden={n !== i}
          className={`absolute inset-0 size-full object-contain p-4 transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <span className="absolute bottom-3 left-3 rounded-full bg-brand-900/75 px-2.5 py-1 text-xs font-semibold text-white">
        {l(list[i].name)} · {fmt(t.car.seats, { n: list[i].seats })}
      </span>
    </div>
  )
}

interface CarQuoteValues extends ContactValues {
  service: Service
  pickup: string
  dropoff: string
  stops: { place: string }[]
  date: string
  time: string
  endDate: string
  passengers: number
  luggage: number
  vehicle: string
  flight: string
  notes: string
}

export default function CarQuote() {
  const { t, l, lang } = useI18n()
  const r = makeRules(t)
  const [sp] = useSearchParams()
  const { submit, sending, errorMessage, honeypot } = useSubmit('car')
  const vehicleParam = sp.get('vehicle')
  const serviceParam = sp.get('service') as Service | null

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted, isValid },
  } = useForm<CarQuoteValues>({
    mode: 'onTouched',
    // Conditional fields (flight, end date, stops) drop out of the payload and validation when hidden.
    shouldUnregister: true,
    defaultValues: {
      service: serviceParam && SERVICES.includes(serviceParam) ? serviceParam : 'airport',
      pickup: sp.get('from') ?? '',
      dropoff: sp.get('to') ?? '',
      date: sp.get('date') ?? '',
      stops: [],
      passengers: 2,
      luggage: 2,
      vehicle: vehicles.some((v) => v.slug === vehicleParam) ? vehicleParam! : 'unsure',
      language: lang,
    },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'stops' })
  const service = watch('service')
  const selectedVehicle = vehicles.find((v) => v.slug === watch('vehicle'))
  const multiDay = service === 'multiday' || service === 'group' || service === 'intercity'
  const err = (k: keyof CarQuoteValues) => errors[k]?.message as string | undefined

  return (
    <>
      <Seo title={t.carQuote.title} description={t.carQuote.intro} path="/private-car/quote" />
      <PageIntro crumbs={[{ label: t.nav.car, to: '/private-car' }, { label: t.carQuote.title }]} title={t.carQuote.title} intro={t.carQuote.intro} image="/images/cars/road-hero.webp" />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit((v) => submit({ ...v, locale: lang }))} noValidate className="relative space-y-8">
          <Honeypot inputRef={honeypot} />
          {isSubmitted && !isValid && <FormAlert message={t.form.errSummary} />}
          <FormAlert message={errorMessage} />

          <fieldset className="card space-y-5 p-6">
            <legend className="px-1 text-lg font-bold">{t.carQuote.tripTitle}</legend>
            <Field id="cq-service" label={t.carQuote.service} required error={err('service')}>
              <select className="field-input" {...register('service', r.required)}>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {t.carQuote.services[s]}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="cq-pickup" label={t.carQuote.pickup} required error={err('pickup')}>
                <input className="field-input" placeholder={service === 'airport' ? 'Noi Bai Airport (HAN)' : 'Hanoi Old Quarter'} {...register('pickup', r.text(200))} />
              </Field>
              <Field id="cq-dropoff" label={t.carQuote.dropoff} error={err('dropoff')}>
                <input className="field-input" {...register('dropoff', r.optionalText(200))} />
              </Field>
            </div>

            {(service === 'intercity' || service === 'multiday' || service === 'group') && (
              <div>
                <p className="field-label">
                  {t.carQuote.stops} <span className="text-xs font-normal text-muted">({t.form.optional})</span>
                </p>
                <ol className="space-y-2">
                  {fields.map((f, i) => (
                    <li key={f.id} className="flex gap-2">
                      <label htmlFor={`cq-stop-${i}`} className="sr-only">
                        {fmt(t.carQuote.stop, { n: i + 1 })}
                      </label>
                      <input id={`cq-stop-${i}`} className="field-input" placeholder={fmt(t.carQuote.stop, { n: i + 1 })} {...register(`stops.${i}.place` as const, r.text(200))} />
                      <button type="button" onClick={() => remove(i)} className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line text-accent-600 hover:bg-accent-50" aria-label={t.carQuote.removeStop}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ol>
                {fields.length < 8 && (
                  <button type="button" onClick={() => append({ place: '' })} className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline">
                    <Plus className="size-4" aria-hidden /> {t.carQuote.addStop}
                  </button>
                )}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-3">
              <Field id="cq-date" label={t.carQuote.date} required error={err('date')}>
                <input type="date" min={todayISO()} className="field-input" {...register('date', r.futureDate())} />
              </Field>
              <Field id="cq-time" label={t.carQuote.time} error={err('time')}>
                <input type="time" className="field-input" {...register('time')} />
              </Field>
              {multiDay && (
                <Field id="cq-end" label={t.carQuote.endDate} required={service === 'multiday'} error={err('endDate')}>
                  <input
                    type="date"
                    min={watch('date') || todayISO()}
                    className="field-input"
                    {...register('endDate', {
                      ...(service === 'multiday' ? r.required : {}),
                      validate: (v, all) => !v || !all.date || v >= all.date || t.form.errEndDate,
                    })}
                  />
                </Field>
              )}
            </div>
            {service === 'airport' && (
              <Field id="cq-flight" label={t.carQuote.flight} error={err('flight')} className="max-w-xs">
                <input className="field-input uppercase" placeholder={t.carQuote.flightPh} {...register('flight', r.optionalText(20))} />
              </Field>
            )}
            <div className="grid gap-5 sm:grid-cols-3">
              <Field id="cq-pax" label={t.carQuote.passengers} required error={err('passengers')}>
                <input type="number" min={1} max={45} className="field-input" {...register('passengers', r.int(1, 45))} />
              </Field>
              <Field id="cq-lug" label={t.carQuote.luggage} error={err('luggage')}>
                <input type="number" min={0} max={80} className="field-input" {...register('luggage', r.int(0, 80, false))} />
              </Field>
              <Field id="cq-vehicle" label={t.carQuote.vehicle} error={err('vehicle')}>
                <select className="field-input" {...register('vehicle')}>
                  <option value="unsure">{t.carQuote.notSure}</option>
                  {vehicles.map((v) => (
                    <option key={v.slug} value={v.slug}>
                      {l(v.name)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="cq-notes" label={t.carQuote.notes} error={err('notes')}>
              <textarea rows={3} className="field-input" {...register('notes', r.optionalText(2000))} />
            </Field>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="px-1 text-lg font-bold">{t.carQuote.contactTitle}</legend>
            <ContactFields<CarQuoteValues> register={register} errors={errors} idPrefix="cq" />
          </fieldset>

          <SubmitBar sending={sending} label={t.carQuote.submit} />
        </form>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="card">
            {selectedVehicle?.image ? (
              <Img src={selectedVehicle.image} alt={l(selectedVehicle.name)} className="aspect-[16/9] w-full bg-gradient-to-br from-white to-brand-50 object-contain p-4" />
            ) : (
              <VehicleCycle />
            )}
            <div className="p-5">
              <h2 className="font-bold">{selectedVehicle ? l(selectedVehicle.name) : t.carQuote.notSureTitle}</h2>
              {selectedVehicle && (
                <p className="mt-1 text-sm text-muted">
                  {t.car.suitable}: {l(selectedVehicle.suitable)}
                </p>
              )}
              {selectedVehicle ? <p className="mt-3 text-xs text-muted">{t.car.luggage}</p> : <p className="mt-1 text-sm text-muted">{t.carQuote.notSureText}</p>}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
